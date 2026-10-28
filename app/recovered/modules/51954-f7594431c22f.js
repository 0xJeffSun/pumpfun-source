// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  e.s(["f", () => e5], 51954);
  var n,
    a,
    o = e.i(149502),
    r = e.i(728141),
    i = e.i(761321),
    s = e.i(254667),
    u = e.i(824425),
    c = e.i(575281),
    m = e.i(959719),
    l = e.i(971370),
    d = e.i(424509),
    p = e.i(958083),
    _ = Symbol.for("immer-nothing"),
    y = Symbol.for("immer-draftable"),
    f = Symbol.for("immer-state");
  function b(e) {
    throw Error(
      `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
    );
  }
  var g = Object.getPrototypeOf;
  function h(e) {
    return !!e && !!e[f];
  }
  function k(e) {
    return (
      !!e &&
      (A(e) ||
        Array.isArray(e) ||
        !!e[y] ||
        !!e.constructor?.[y] ||
        E(e) ||
        T(e))
    );
  }
  var v = Object.prototype.constructor.toString(),
    w = new WeakMap();
  function A(e) {
    if (!e || "object" != typeof e) return !1;
    let t = Object.getPrototypeOf(e);
    if (null === t || t === Object.prototype) return !0;
    let n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
    if (n === Object) return !0;
    if ("function" != typeof n) return !1;
    let a = w.get(n);
    return (
      void 0 === a && ((a = Function.toString.call(n)), w.set(n, a)),
      a === v
    );
  }
  function C(e, t, n = !0) {
    0 === P(e)
      ? (n ? Reflect.ownKeys(e) : Object.keys(e)).forEach((n) => {
          t(n, e[n], e);
        })
      : e.forEach((n, a) => t(a, n, e));
  }
  function P(e) {
    let t = e[f];
    return t ? t.type_ : Array.isArray(e) ? 1 : E(e) ? 2 : 3 * !!T(e);
  }
  function B(e, t) {
    return 2 === P(e) ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
  }
  function S(e, t, n) {
    let a = P(e);
    2 === a ? e.set(t, n) : 3 === a ? e.add(n) : (e[t] = n);
  }
  function E(e) {
    return e instanceof Map;
  }
  function T(e) {
    return e instanceof Set;
  }
  function q(e) {
    return e.copy_ || e.base_;
  }
  function M(e, t) {
    if (E(e)) return new Map(e);
    if (T(e)) return new Set(e);
    if (Array.isArray(e)) return Array.prototype.slice.call(e);
    let n = A(e);
    if (!0 !== t && ("class_only" !== t || n)) {
      let t = g(e);
      return null !== t && n ? { ...e } : Object.assign(Object.create(t), e);
    }
    {
      let t = Object.getOwnPropertyDescriptors(e);
      delete t[f];
      let n = Reflect.ownKeys(t);
      for (let a = 0; a < n.length; a++) {
        let o = n[a],
          r = t[o];
        (!1 === r.writable && ((r.writable = !0), (r.configurable = !0)),
          (r.get || r.set) &&
            (t[o] = {
              configurable: !0,
              writable: !0,
              enumerable: r.enumerable,
              value: e[o],
            }));
      }
      return Object.create(g(e), t);
    }
  }
  function F(e, t = !1) {
    return (
      x(e) ||
        h(e) ||
        !k(e) ||
        (P(e) > 1 &&
          Object.defineProperties(e, { set: I, add: I, clear: I, delete: I }),
        Object.freeze(e),
        t && Object.values(e).forEach((e) => F(e, !0))),
      e
    );
  }
  var I = {
    value: function () {
      b(2);
    },
  };
  function x(e) {
    return null === e || "object" != typeof e || Object.isFrozen(e);
  }
  var R = {};
  function U(e) {
    let t = R[e];
    return (t || b(0), t);
  }
  function V(e, t) {
    t &&
      (U("Patches"),
      (e.patches_ = []),
      (e.inversePatches_ = []),
      (e.patchListener_ = t));
  }
  function N(e) {
    (L(e), e.drafts_.forEach(O), (e.drafts_ = null));
  }
  function L(e) {
    e === a && (a = e.parent_);
  }
  function D(e) {
    return (a = {
      drafts_: [],
      parent_: a,
      immer_: e,
      canAutoFreeze_: !0,
      unfinalizedDrafts_: 0,
    });
  }
  function O(e) {
    let t = e[f];
    0 === t.type_ || 1 === t.type_ ? t.revoke_() : (t.revoked_ = !0);
  }
  function z(e, t) {
    t.unfinalizedDrafts_ = t.drafts_.length;
    let n = t.drafts_[0];
    return (
      void 0 !== e && e !== n
        ? (n[f].modified_ && (N(t), b(4)),
          k(e) && ((e = G(t, e)), t.parent_ || Q(t, e)),
          t.patches_ &&
            U("Patches").generateReplacementPatches_(
              n[f].base_,
              e,
              t.patches_,
              t.inversePatches_,
            ))
        : (e = G(t, n, [])),
      N(t),
      t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
      e !== _ ? e : void 0
    );
  }
  function G(e, t, n) {
    if (x(t)) return t;
    let a = e.immer_.shouldUseStrictIteration(),
      o = t[f];
    if (!o) return (C(t, (a, r) => W(e, o, t, a, r, n), a), t);
    if (o.scope_ !== e) return t;
    if (!o.modified_) return (Q(e, o.base_, !0), o.base_);
    if (!o.finalized_) {
      ((o.finalized_ = !0), o.scope_.unfinalizedDrafts_--);
      let t = o.copy_,
        r = t,
        i = !1;
      (3 === o.type_ && ((r = new Set(t)), t.clear(), (i = !0)),
        C(r, (a, r) => W(e, o, t, a, r, n, i), a),
        Q(e, t, !1),
        n &&
          e.patches_ &&
          U("Patches").generatePatches_(o, n, e.patches_, e.inversePatches_));
    }
    return o.copy_;
  }
  function W(e, t, n, a, o, r, i) {
    if (null == o || ("object" != typeof o && !i)) return;
    let s = x(o);
    if (!s || i) {
      if (h(o)) {
        let i = G(
          e,
          o,
          r && t && 3 !== t.type_ && !B(t.assigned_, a) ? r.concat(a) : void 0,
        );
        if ((S(n, a, i), !h(i))) return;
        e.canAutoFreeze_ = !1;
      } else i && n.add(o);
      if (k(o) && !s) {
        if (
          (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) ||
          (t && t.base_ && t.base_[a] === o && s)
        )
          return;
        (G(e, o),
          (!t || !t.scope_.parent_) &&
            "symbol" != typeof a &&
            (E(n)
              ? n.has(a)
              : Object.prototype.propertyIsEnumerable.call(n, a)) &&
            Q(e, o));
      }
    }
  }
  function Q(e, t, n = !1) {
    !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && F(t, n);
  }
  var K = {
      get(e, t) {
        if (t === f) return e;
        let n = q(e);
        if (!B(n, t)) {
          var a;
          let o;
          return (
            (a = e),
            (o = Z(n, t))
              ? "value" in o
                ? o.value
                : o.get?.call(a.draft_)
              : void 0
          );
        }
        let o = n[t];
        return e.finalized_ || !k(o)
          ? o
          : o === H(e.base_, t)
            ? (J(e), (e.copy_[t] = X(o, e)))
            : o;
      },
      has: (e, t) => t in q(e),
      ownKeys: (e) => Reflect.ownKeys(q(e)),
      set(e, t, n) {
        let a = Z(q(e), t);
        if (a?.set) return (a.set.call(e.draft_, n), !0);
        if (!e.modified_) {
          let a = H(q(e), t),
            o = a?.[f];
          if (o && o.base_ === n)
            return ((e.copy_[t] = n), (e.assigned_[t] = !1), !0);
          if (
            (n === a ? 0 !== n || 1 / n == 1 / a : n != n && a != a) &&
            (void 0 !== n || B(e.base_, t))
          )
            return !0;
          (J(e), $(e));
        }
        return (
          !!(
            (e.copy_[t] === n && (void 0 !== n || t in e.copy_)) ||
            (Number.isNaN(n) && Number.isNaN(e.copy_[t]))
          ) || ((e.copy_[t] = n), (e.assigned_[t] = !0), !0)
        );
      },
      deleteProperty: (e, t) => (
        void 0 !== H(e.base_, t) || t in e.base_
          ? ((e.assigned_[t] = !1), J(e), $(e))
          : delete e.assigned_[t],
        e.copy_ && delete e.copy_[t],
        !0
      ),
      getOwnPropertyDescriptor(e, t) {
        let n = q(e),
          a = Reflect.getOwnPropertyDescriptor(n, t);
        return a
          ? {
              writable: !0,
              configurable: 1 !== e.type_ || "length" !== t,
              enumerable: a.enumerable,
              value: n[t],
            }
          : a;
      },
      defineProperty() {
        b(11);
      },
      getPrototypeOf: (e) => g(e.base_),
      setPrototypeOf() {
        b(12);
      },
    },
    j = {};
  function H(e, t) {
    let n = e[f];
    return (n ? q(n) : e)[t];
  }
  function Z(e, t) {
    if (!(t in e)) return;
    let n = g(e);
    for (; n; ) {
      let e = Object.getOwnPropertyDescriptor(n, t);
      if (e) return e;
      n = g(n);
    }
  }
  function $(e) {
    !e.modified_ && ((e.modified_ = !0), e.parent_ && $(e.parent_));
  }
  function J(e) {
    e.copy_ || (e.copy_ = M(e.base_, e.scope_.immer_.useStrictShallowCopy_));
  }
  function X(e, t) {
    let n = E(e)
      ? U("MapSet").proxyMap_(e, t)
      : T(e)
        ? U("MapSet").proxySet_(e, t)
        : (function (e, t) {
            let n = Array.isArray(e),
              o = {
                type_: +!!n,
                scope_: t ? t.scope_ : a,
                modified_: !1,
                finalized_: !1,
                assigned_: {},
                parent_: t,
                base_: e,
                draft_: null,
                copy_: null,
                revoke_: null,
                isManual_: !1,
              },
              r = o,
              i = K;
            n && ((r = [o]), (i = j));
            let { revoke: s, proxy: u } = Proxy.revocable(r, i);
            return ((o.draft_ = u), (o.revoke_ = s), u);
          })(e, t);
    return ((t ? t.scope_ : a).drafts_.push(n), n);
  }
  (C(K, (e, t) => {
    j[e] = function () {
      return ((arguments[0] = arguments[0][0]), t.apply(this, arguments));
    };
  }),
    (j.deleteProperty = function (e, t) {
      return j.set.call(this, e, t, void 0);
    }),
    (j.set = function (e, t, n) {
      return K.set.call(this, e[0], t, n, e[0]);
    }));
  var Y = new (class {
      constructor(e) {
        ((this.autoFreeze_ = !0),
          (this.useStrictShallowCopy_ = !1),
          (this.useStrictIteration_ = !0),
          (this.produce = (e, t, n) => {
            let a;
            if ("function" == typeof e && "function" != typeof t) {
              let n = t;
              t = e;
              let a = this;
              return function (e = n, ...o) {
                return a.produce(e, (e) => t.call(this, e, ...o));
              };
            }
            if (
              ("function" != typeof t && b(6),
              void 0 !== n && "function" != typeof n && b(7),
              k(e))
            ) {
              let o = D(this),
                r = X(e, void 0),
                i = !0;
              try {
                ((a = t(r)), (i = !1));
              } finally {
                i ? N(o) : L(o);
              }
              return (V(o, n), z(a, o));
            }
            if (e && "object" == typeof e) b(1);
            else {
              if (
                (void 0 === (a = t(e)) && (a = e),
                a === _ && (a = void 0),
                this.autoFreeze_ && F(a, !0),
                n)
              ) {
                let t = [],
                  o = [];
                (U("Patches").generateReplacementPatches_(e, a, t, o), n(t, o));
              }
              return a;
            }
          }),
          (this.produceWithPatches = (e, t) => {
            let n, a;
            return "function" == typeof e
              ? (t, ...n) => this.produceWithPatches(t, (t) => e(t, ...n))
              : [
                  this.produce(e, t, (e, t) => {
                    ((n = e), (a = t));
                  }),
                  n,
                  a,
                ];
          }),
          "boolean" == typeof e?.autoFreeze && this.setAutoFreeze(e.autoFreeze),
          "boolean" == typeof e?.useStrictShallowCopy &&
            this.setUseStrictShallowCopy(e.useStrictShallowCopy),
          "boolean" == typeof e?.useStrictIteration &&
            this.setUseStrictIteration(e.useStrictIteration));
      }
      createDraft(e) {
        var t;
        (k(e) || b(8),
          h(e) &&
            (h((t = e)) || b(10),
            (e = (function e(t) {
              let n;
              if (!k(t) || x(t)) return t;
              let a = t[f],
                o = !0;
              if (a) {
                if (!a.modified_) return a.base_;
                ((a.finalized_ = !0),
                  (n = M(t, a.scope_.immer_.useStrictShallowCopy_)),
                  (o = a.scope_.immer_.shouldUseStrictIteration()));
              } else n = M(t, !0);
              return (
                C(
                  n,
                  (t, a) => {
                    S(n, t, e(a));
                  },
                  o,
                ),
                a && (a.finalized_ = !1),
                n
              );
            })(t))));
        let n = D(this),
          a = X(e, void 0);
        return ((a[f].isManual_ = !0), L(n), a);
      }
      finishDraft(e, t) {
        let n = e && e[f];
        (n && n.isManual_) || b(9);
        let { scope_: a } = n;
        return (V(a, t), z(void 0, a));
      }
      setAutoFreeze(e) {
        this.autoFreeze_ = e;
      }
      setUseStrictShallowCopy(e) {
        this.useStrictShallowCopy_ = e;
      }
      setUseStrictIteration(e) {
        this.useStrictIteration_ = e;
      }
      shouldUseStrictIteration() {
        return this.useStrictIteration_;
      }
      applyPatches(e, t) {
        let n;
        for (n = t.length - 1; n >= 0; n--) {
          let a = t[n];
          if (0 === a.path.length && "replace" === a.op) {
            e = a.value;
            break;
          }
        }
        n > -1 && (t = t.slice(n + 1));
        let a = U("Patches").applyPatches_;
        return h(e) ? a(e, t) : this.produce(e, (e) => a(e, t));
      }
    })().produce,
    ee = e.i(78436),
    et = e.i(634103),
    en = e.i(376325),
    ea = e.i(466931);
  let eo = new Set([1e3, 1001, 1005]),
    er = new WeakSet(),
    ei = ({ connection: e, endpoint: t }) => {
      let n = e._rpcWebSocket;
      if (!n || "function" != typeof n.on || er.has(n)) return;
      er.add(n);
      let a = ((e) => {
          if (e)
            try {
              return new URL(e).host;
            } catch {
              return;
            }
        })(t),
        o = !1,
        r = !1;
      (n.on("open", () => {
        ((o = !0), (r = !1));
      }),
        n.on("error", () => {
          o ||
            r ||
            ((r = !0),
            (0, ea.l)({
              error: Error("Solana RPC PubSub WebSocket failed to connect"),
              feature: "solana-rpc",
              operation: "websocket-connect-error",
              context: {
                endpoint: a,
                currentReconnects: n.getCurrentReconnects?.(),
              },
            }));
        }),
        n.on("close", (e, t) => {
          let r = o;
          ((o = !1),
            !r ||
              eo.has(e) ||
              (0, ea.B)({
                name: "solana-ws-closed",
                feature: "solana-rpc",
                operation: "websocket-close",
                context: {
                  endpoint: a,
                  closeCode: e,
                  closeReason: t,
                  currentReconnects: n.getCurrentReconnects?.(),
                },
              }));
        }));
    };
  (e.s(["f", 0, ei], 757373), e.i(753134));
  var es = e.i(110823),
    eu = e.i(480133),
    ec = e.i(679925);
  let em = BigInt(10) ** BigInt(12),
    el = ({ numerator: e, denominator: t }) => {
      let n = (e * em) / t;
      return n === BigInt(0) ? 0 : -Number(n) / 1e10;
    },
    ed = ({ tokensOut: e, tokenReserveBefore: t }) =>
      null == t || t <= BigInt(0) || e < BigInt(0) || e >= t
        ? null
        : el({ numerator: e, denominator: t });
  var ep = e.i(188902),
    e_ = e.i(548127);
  let ey = (e) => {
      let t = (0, ep.M)();
      return { ...e_.Z, ...(t ? { wsEndpoint: t } : {}), ...e };
    },
    ef = (e) => {
      let t = ey(e),
        n = new l.Connection((0, ep.L)(), t);
      return (ei({ connection: n, endpoint: t.wsEndpoint ?? (0, ep.M)() }), n);
    };
  e.s(["n", 0, ef, "M", 0, ey], 636006);
  var eb = e.i(43074);
  let eg = (e) => !!e && null === e.err,
    eh = async (e, t, n, a) => {
      let o, r;
      try {
        return await Promise.race([
          e,
          new Promise((e, i) => {
            ((o = setTimeout(() => i(Error(n)), t)),
              (r = () => i(Error("Confirmation aborted"))),
              a?.aborted ? r() : a?.addEventListener("abort", r, { once: !0 }));
          }),
        ]);
      } finally {
        (o && clearTimeout(o), r && a?.removeEventListener("abort", r));
      }
    },
    ek = (e, t) =>
      new Promise((n) => {
        if (t?.aborted) return void n();
        let a = setTimeout(() => {
            (t?.removeEventListener("abort", o), n());
          }, e),
          o = () => {
            (clearTimeout(a), n());
          };
        t?.addEventListener("abort", o, { once: !0 });
      }),
    ev = async (e, t) => {
      let { value: n } = await e.getSignatureStatuses([t], {
        searchTransactionHistory: !1,
      });
      return n[0];
    },
    ew = async (e, t, n) => {
      try {
        return await eh(ev(e, t), 1e4, "getSignatureStatuses timed out", n);
      } catch {
        return null;
      }
    },
    eA = async (e, t) => {
      try {
        return await eh(
          e.getBlockHeight("confirmed"),
          1e4,
          "getBlockHeight timed out",
          t,
        );
      } catch {
        return null;
      }
    },
    eC = async (e, t, n) => {
      try {
        return (
          await eh(
            e.isBlockhashValid(t, { commitment: "confirmed" }),
            1e4,
            "isBlockhashValid timed out",
            n,
          )
        ).value;
      } catch {
        return null;
      }
    },
    eP = (e, t) => {
      if (e?.err)
        throw t
          ? (0, eb.d)(e.err, t)
          : Error(`Transaction failed: ${JSON.stringify(e.err)}`);
    },
    eB = async (e) => {
      let t = await ev(e.connection, e.signature);
      return (eP(t, e.signedTx), eg(t));
    },
    eS = async (e) => {
      let {
          connection: t,
          signature: n,
          timeoutMs: a = 15e3,
          signedTx: o,
          signal: r,
        } = e,
        i = Date.now() + a;
      for (; Date.now() < i && !r?.aborted; ) {
        let e = await ew(t, n, r);
        if ((eP(e, o), eg(e))) return !0;
        await ek(300, r);
      }
      return !1;
    },
    eE = async (e) => {
      let {
          connection: t,
          signature: n,
          blockhash: a,
          lastValidBlockHeight: o,
          signedTx: r,
          signal: i,
        } = e,
        s = Date.now() + 12e4;
      for (; Date.now() < s; ) {
        let e;
        if (i.aborted) return { type: "gaveup" };
        let s = await ew(t, n, i);
        if (i.aborted) return { type: "gaveup" };
        if ((eP(s, r), eg(s))) return { type: "landed" };
        if (void 0 === o) e = (await eC(t, a, i)) === !1;
        else {
          let n = await eA(t, i);
          e = null !== n && n > o;
        }
        if (e) {
          if (await eS({ connection: t, signature: n, signedTx: r, signal: i }))
            return { type: "landed" };
          if (i.aborted) return { type: "gaveup" };
          if (void 0 === o && (await eC(t, a, i)) !== !1) continue;
          return {
            type: "gaveup",
            reason: Error(
              void 0 === o
                ? `Signature ${n} has expired: blockhash not found.`
                : `Signature ${n} has expired: block height exceeded.`,
            ),
          };
        }
        await ek(300, i);
      }
      return (await eS({ connection: t, signature: n, signedTx: r, signal: i }))
        ? { type: "landed" }
        : i.aborted
          ? { type: "gaveup" }
          : {
              type: "gaveup",
              reason: Error(
                `Timed out waiting for transaction confirmation: ${n}`,
              ),
            };
    },
    eT = async (e) => {
      let {
        connection: t,
        signature: n,
        blockhash: a,
        lastValidBlockHeight: o,
        commitment: r = "confirmed",
        signedTx: i,
      } = e;
      try {
        if (
          await eh(
            eB({ connection: t, signature: n, signedTx: i }),
            1e4,
            "Initial signature status read timed out",
          )
        )
          return;
      } catch {}
      let s = new AbortController(),
        { signal: u } = s,
        c = eE({
          connection: t,
          signature: n,
          blockhash: a,
          lastValidBlockHeight: o,
          signedTx: i,
          signal: u,
        }),
        m = ((e) => {
          let {
            connection: t,
            signature: n,
            blockhash: a,
            lastValidBlockHeight: o,
            commitment: r,
            signedTx: i,
            signal: s,
          } = e;
          return void 0 === o
            ? ((e) => {
                let t,
                  n,
                  a,
                  {
                    connection: o,
                    signature: r,
                    commitment: i,
                    signedTx: s,
                    signal: u,
                  } = e,
                  c = !1;
                return new Promise((e, m) => {
                  if (((a = () => e({ type: "gaveup" })), u.aborted))
                    return void a();
                  (u.addEventListener("abort", a, { once: !0 }),
                    (n = setTimeout(a, 12e4)));
                  try {
                    t = o.onSignature(
                      r,
                      (t) => {
                        c = !0;
                        try {
                          (eP(t, s), e({ type: "landed" }));
                        } catch (e) {
                          m(e);
                        }
                      },
                      i,
                    );
                  } catch {
                    e({ type: "gaveup" });
                  }
                }).finally(() => {
                  (clearTimeout(n),
                    a && u.removeEventListener("abort", a),
                    void 0 === t ||
                      c ||
                      o.removeSignatureListener(t).catch(() => void 0));
                });
              })(e)
            : Promise.race([
                t
                  .confirmTransaction(
                    {
                      signature: n,
                      blockhash: a,
                      lastValidBlockHeight: o,
                      abortSignal: s,
                    },
                    r,
                  )
                  .then(
                    (e) => (eP(e?.value, i), { type: "landed" }),
                    () => ({ type: "gaveup" }),
                  ),
                ek(12e4, s).then(() => ({ type: "gaveup" })),
              ]);
        })({
          connection: t,
          signature: n,
          blockhash: a,
          lastValidBlockHeight: o,
          commitment: r,
          signedTx: i,
          signal: u,
        });
      try {
        await new Promise((e, t) => {
          let a,
            o = 0,
            r = (r) => {
              "landed" === r.type
                ? e()
                : (r.reason && (a = r.reason),
                  (o += 1) >= 2 &&
                    t(
                      a ??
                        Error(
                          `Timed out waiting for transaction confirmation: ${n}`,
                        ),
                    ));
            };
          (c.then(r, t), m.then(r, t));
        });
      } finally {
        s.abort();
      }
    };
  e.s(
    [
      "O",
      0,
      eT,
      "f",
      0,
      (e) => {
        if (
          e instanceof l.TransactionExpiredBlockheightExceededError ||
          e instanceof l.TransactionExpiredTimeoutError
        )
          return !0;
        let t = (
          e instanceof Error ? e.message : "string" == typeof e ? e : ""
        ).toLowerCase();
        return (
          t.includes("block height exceeded") ||
          t.includes("blockhash not found")
        );
      },
    ],
    949879,
  );
  var eq = e.i(641947);
  class eM extends Error {
    signers;
    constructor(e) {
      (super(
        `Transaction is missing ${1 === e.length ? "a signature" : "signatures"} for ${e.join(", ")}`,
      ),
        (this.name = "MissingSignaturesError"),
        (this.signers = e));
    }
  }
  var eF = e.i(412296),
    eI = e.i(358052),
    ex = e.i(93903),
    eR = e.i(655397),
    eU = e.i(443618),
    eV = e.i(675500),
    eN = e.i(446870);
  let eL = async () => {
      let e = e5.getState().connection;
      return e ? await (0, eU.f)(e) : Promise.resolve(null);
    },
    eD = (e) => {
      Math.random() >= 0.01 ||
        (0, ea.l)({
          error: e,
          feature: "blockhash",
          operation: "poll",
          context: { hidden: "u" > typeof document && document.hidden },
        });
    },
    eO = () => eL().catch(eD),
    ez = () => {
      if ("visible" === document.visibilityState && void 0 !== (0, eV.b)()) {
        let e;
        ((0, eN.X)(), eO(), (e = setInterval(eO, 2e3)), (0, eN.J)(e));
      } else (0, eN.X)();
    };
  var eG = e.i(361317);
  let eW = ({
    hasBondingCurve: e,
    bondingCurveComplete: t,
    hasBaseMintAccount: n,
    hasPool: a,
    hasPoolBaseTokenAccount: o,
    hasPoolQuoteTokenAccount: r,
  }) =>
    e && !1 === t
      ? "bondingCurve"
      : a && n && o && r
        ? "pumpSwap"
        : e && !0 === t
          ? "estimatedPumpSwap"
          : "unavailable";
  e.s(["f", 0, eW], 574682);
  let eQ = {
    connection: ef(),
    global: {
      global: null,
      globalConfig: null,
      feeConfig: null,
      ammFeeConfig: null,
    },
    user: {
      address: void 0,
      solBalance: 0,
      solBalanceLoaded: !1,
      userWsolAccountInfo: null,
      combinedSolBalanceDisplay: "0",
      creatorFeeBalanceDisplay: "0",
      creatorFeeBalanceUsdcDisplay: "0",
      creatorVaultAccountInfo: null,
      creatorVaultUsdcAta: null,
      coinCreatorVaultAta: null,
      coinCreatorVaultUsdcAta: null,
    },
    coinsByMint: {},
    isLoading: !1,
    error: null,
    generation: 0,
    currentWallet: null,
    subscriptions: {},
    holdersBySubKey: {},
    leaseMeta: {},
    leaseGcConfig: { leaseTtlMs: 18e4, heartbeatMs: 3e4 },
    unsubscribeDelayMs: 15e3,
    gcTimerRef: null,
    tokenBalanceByMint: {},
    lastUpdatedByKey: {},
    blockhashCleanup: null,
  };
  var eK =
    (((n = {}).SOL_BALANCE = "SOL_BALANCE"),
    (n.TOKEN_BALANCE = "TOKEN_BALANCE"),
    (n.USER_ACCOUNTS = "USER_ACCOUNTS"),
    (n.COIN_ACCOUNTS = "COIN_ACCOUNTS"),
    (n.RAYDIUM_POOL = "RAYDIUM_POOL"),
    n);
  let ej = (e) => {
    switch (e.tag) {
      case "SOL_BALANCE":
        return { subKey: "SOL_BALANCE", lease: e };
      case "TOKEN_BALANCE":
        return { subKey: `TOKEN_BALANCE:${e.data.mint.toBase58()}`, lease: e };
      case "USER_ACCOUNTS":
        return {
          subKey: `USER_ACCOUNTS:${e.data.address.toBase58()}`,
          lease: e,
        };
      case "COIN_ACCOUNTS": {
        let t = e.data.poolAddress?.toBase58();
        return {
          subKey: t
            ? `COIN_ACCOUNTS:${e.data.mint.toBase58()}:pool:${t}`
            : `COIN_ACCOUNTS:${e.data.mint.toBase58()}`,
          lease: e,
        };
      }
      case "RAYDIUM_POOL":
        return { subKey: `RAYDIUM_POOL:${e.data.mint.toBase58()}`, lease: e };
    }
  };
  e.s(["C", () => eK, "V", 0, ej], 227627);
  var eH = e.i(928468);
  let eZ = new d.default(890880),
    e$ = null,
    eJ = null;
  function eX() {
    return (e$ ??= e.A(460970).then((e) => ((eJ = e), e)));
  }
  let eY = ({ mintKey: e, quoteMintKey: t, poolAddress: n }) => {
      if (n) {
        if ("string" != typeof n) return n;
        try {
          return new l.PublicKey(n);
        } catch {
          console.warn(
            "[BlockchainStore] Invalid pool address, defaulting to canonical pool PDA:",
            n,
          );
        }
      }
      return (0, i.n)(e, t);
    },
    e1 = new Map(),
    e0 = (e, t, n) => {
      t &&
        !n.aborted &&
        (e1.set(e, t),
        n.addEventListener(
          "abort",
          () => {
            e1.get(e) === t && e1.delete(e);
          },
          { once: !0 },
        ));
    },
    e2 = /^\d{3} /,
    e4 = (e, t) => (n) => {
      if (!t.aborted && "aborted" !== (0, en.f)(n)) {
        if (
          (0, eG.R)(n) ||
          (n instanceof Error &&
            (e2.test(n.message) || "SolanaJSONRPCError" === n.name))
        )
          return void s.y.warn("blockchain.account_read_failed", {
            subKey: e,
            error: n,
          });
        (0, ea.l)({
          error: n,
          feature: "solana-rpc",
          operation: "account-read",
          context: { subKey: e },
        });
      }
    },
    e6 = [500, 1500, 3500],
    e9 = new Map();
  !(function () {
    class e extends Map {
      constructor(e, t) {
        (super(),
          (this[f] = {
            type_: 2,
            parent_: t,
            scope_: t ? t.scope_ : a,
            modified_: !1,
            finalized_: !1,
            copy_: void 0,
            assigned_: void 0,
            base_: e,
            draft_: this,
            isManual_: !1,
            revoked_: !1,
          }));
      }
      get size() {
        return q(this[f]).size;
      }
      has(e) {
        return q(this[f]).has(e);
      }
      set(e, n) {
        let a = this[f];
        return (
          r(a),
          (q(a).has(e) && q(a).get(e) === n) ||
            (t(a),
            $(a),
            a.assigned_.set(e, !0),
            a.copy_.set(e, n),
            a.assigned_.set(e, !0)),
          this
        );
      }
      delete(e) {
        if (!this.has(e)) return !1;
        let n = this[f];
        return (
          r(n),
          t(n),
          $(n),
          n.base_.has(e) ? n.assigned_.set(e, !1) : n.assigned_.delete(e),
          n.copy_.delete(e),
          !0
        );
      }
      clear() {
        let e = this[f];
        (r(e),
          q(e).size &&
            (t(e),
            $(e),
            (e.assigned_ = new Map()),
            C(e.base_, (t) => {
              e.assigned_.set(t, !1);
            }),
            e.copy_.clear()));
      }
      forEach(e, t) {
        q(this[f]).forEach((n, a, o) => {
          e.call(t, this.get(a), a, this);
        });
      }
      get(e) {
        let n = this[f];
        r(n);
        let a = q(n).get(e);
        if (n.finalized_ || !k(a) || a !== n.base_.get(e)) return a;
        let o = X(a, n);
        return (t(n), n.copy_.set(e, o), o);
      }
      keys() {
        return q(this[f]).keys();
      }
      values() {
        let e = this.keys();
        return {
          [Symbol.iterator]: () => this.values(),
          next: () => {
            let t = e.next();
            return t.done ? t : { done: !1, value: this.get(t.value) };
          },
        };
      }
      entries() {
        let e = this.keys();
        return {
          [Symbol.iterator]: () => this.entries(),
          next: () => {
            let t = e.next();
            if (t.done) return t;
            let n = this.get(t.value);
            return { done: !1, value: [t.value, n] };
          },
        };
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    }
    function t(e) {
      e.copy_ || ((e.assigned_ = new Map()), (e.copy_ = new Map(e.base_)));
    }
    class n extends Set {
      constructor(e, t) {
        (super(),
          (this[f] = {
            type_: 3,
            parent_: t,
            scope_: t ? t.scope_ : a,
            modified_: !1,
            finalized_: !1,
            copy_: void 0,
            base_: e,
            draft_: this,
            drafts_: new Map(),
            revoked_: !1,
            isManual_: !1,
          }));
      }
      get size() {
        return q(this[f]).size;
      }
      has(e) {
        let t = this[f];
        return (r(t), t.copy_)
          ? !!(
              t.copy_.has(e) ||
              (t.drafts_.has(e) && t.copy_.has(t.drafts_.get(e)))
            )
          : t.base_.has(e);
      }
      add(e) {
        let t = this[f];
        return (r(t), this.has(e) || (o(t), $(t), t.copy_.add(e)), this);
      }
      delete(e) {
        if (!this.has(e)) return !1;
        let t = this[f];
        return (
          r(t),
          o(t),
          $(t),
          t.copy_.delete(e) ||
            (!!t.drafts_.has(e) && t.copy_.delete(t.drafts_.get(e)))
        );
      }
      clear() {
        let e = this[f];
        (r(e), q(e).size && (o(e), $(e), e.copy_.clear()));
      }
      values() {
        let e = this[f];
        return (r(e), o(e), e.copy_.values());
      }
      entries() {
        let e = this[f];
        return (r(e), o(e), e.copy_.entries());
      }
      keys() {
        return this.values();
      }
      [Symbol.iterator]() {
        return this.values();
      }
      forEach(e, t) {
        let n = this.values(),
          a = n.next();
        for (; !a.done; ) (e.call(t, a.value, a.value, this), (a = n.next()));
      }
    }
    function o(e) {
      e.copy_ ||
        ((e.copy_ = new Set()),
        e.base_.forEach((t) => {
          if (k(t)) {
            let n = X(t, e);
            (e.drafts_.set(t, n), e.copy_.add(n));
          } else e.copy_.add(t);
        }));
    }
    function r(e) {
      e.revoked_ && b(3, JSON.stringify(q(e)));
    }
    R.MapSet ||
      (R.MapSet = {
        proxyMap_: function (t, n) {
          return new e(t, n);
        },
        proxySet_: function (e, t) {
          return new n(e, t);
        },
      });
  })();
  let e5 = (0, ee.$)()(
      (0, et.u)(
        ((t = (e, t) => ({
          ...eQ,
          initializeConnectionAndSetup: async (n, a) => {
            let o,
              r = new l.Connection(n, a);
            (ei({ connection: r, endpoint: a?.wsEndpoint ?? (0, ep.M)() }),
              ((e, t) => {
                let n = e._rpcWebSocket;
                if (!n || "function" != typeof n.on) return () => {};
                let a = !1,
                  o = !1,
                  r = (e) => {
                    1e3 !== e && (o = !0);
                  },
                  i = () => {
                    o = !0;
                  },
                  s = () => {
                    !a && o && ((o = !1), t());
                  };
                return (
                  n.on("open", s),
                  n.on("close", r),
                  n.on("error", i),
                  () => {
                    ((a = !0),
                      n.off?.("open", s),
                      n.off?.("close", r),
                      n.off?.("error", i));
                  }
                );
              })(r, () => t().handleWebSocketReopen()),
              e({ connection: r }));
            let i = t().blockhashCleanup;
            (i && i(),
              e({
                blockhashCleanup:
                  (ez(),
                  document.addEventListener("visibilitychange", ez),
                  (o = (0, eV.U)(ez)),
                  () => {
                    (document.removeEventListener("visibilitychange", ez),
                      o(),
                      (0, eN.X)());
                  }),
              }),
              t().startGcTimers(),
              t().fetchAllGlobalAccounts());
          },
          fetchAllGlobalAccounts: async () => {
            let { connection: n } = t();
            if (!n)
              throw Error(
                "BlockchainStore does not have a initializedConnection yet.",
              );
            let a = [r.R, i.Z, r.C, i.S],
              [o, s, u, c] = await n.getMultipleAccountsInfo(a),
              m = o ? (0, eG.i)((e) => r.A.decodeGlobal(e), o) : null,
              l = s ? (0, eG.i)((e) => i.q.decodeGlobalConfig(e), s) : null,
              d = u ? (0, eG.i)((e) => r.A.decodeFeeConfig(e), u) : null,
              p = c ? (0, eG.i)((e) => r.A.decodeFeeConfig(e), c) : null;
            e((e) => ({
              global: {
                global:
                  m && o
                    ? { accountInfo: o, decodedAccount: m }
                    : e.global.global,
                globalConfig:
                  l && s
                    ? { accountInfo: s, decodedAccount: l }
                    : e.global.globalConfig,
                feeConfig:
                  d && u
                    ? { accountInfo: u, decodedAccount: d }
                    : e.global.feeConfig,
                ammFeeConfig:
                  p && c
                    ? { accountInfo: c, decodedAccount: p }
                    : e.global.ammFeeConfig,
              },
            }));
          },
          updateUserCombinedBalance: () => {
            let { user: n } = t(),
              a = new d.default(n.solBalance.toString()),
              o = new d.default(
                n.userWsolAccountInfo
                  ? n.userWsolAccountInfo.decodedAccount.amount.toString()
                  : 0,
              ),
              r = a.add(o),
              i = new p.o(r.toString()).div(l.LAMPORTS_PER_SOL).toFixed(9);
            e((e) => ({ user: { ...e.user, combinedSolBalanceDisplay: i } }));
          },
          updateUserCreatorFeeBalance: () => {
            let { user: n } = t(),
              a = new d.default(
                n.creatorVaultAccountInfo?.lamports?.toString() || 0,
              ).sub(eZ),
              o = a.lt(new d.default(0)) ? new d.default(0) : a,
              r = new d.default(
                n.coinCreatorVaultAta
                  ? n.coinCreatorVaultAta.decodedAccount.amount.toString()
                  : 0,
              ),
              i = o.add(r),
              s = new p.o(i.toString()).div(l.LAMPORTS_PER_SOL).toFixed(9),
              u = new d.default(
                n.creatorVaultUsdcAta
                  ? n.creatorVaultUsdcAta.decodedAccount.amount.toString()
                  : 0,
              ),
              c = new d.default(
                n.coinCreatorVaultUsdcAta
                  ? n.coinCreatorVaultUsdcAta.decodedAccount.amount.toString()
                  : 0,
              ),
              m = u.add(c),
              _ = new p.o(m.toString()).div(1e6).toFixed(6);
            e((e) => ({
              user: {
                ...e.user,
                creatorFeeBalanceDisplay: s,
                creatorFeeBalanceUsdcDisplay: _,
              },
            }));
          },
          setUserAddress: async (n) => {
            let a;
            if (!n) {
              (t().handleWalletChange(null),
                e((e) => ({
                  user: {
                    ...e.user,
                    address: void 0,
                    solBalance: 0,
                    solBalanceLoaded: !1,
                    userWsolAccountInfo: null,
                    combinedSolBalanceDisplay: "0",
                    creatorFeeBalanceDisplay: "0",
                    creatorFeeBalanceUsdcDisplay: "0",
                    creatorVaultAccountInfo: null,
                    creatorVaultUsdcAta: null,
                    coinCreatorVaultAta: null,
                    coinCreatorVaultUsdcAta: null,
                  },
                })));
              return;
            }
            try {
              a = new l.PublicKey(n);
            } catch {
              return;
            }
            let { connection: o } = t();
            o &&
              (e((e) => ({
                user: {
                  ...e.user,
                  address: a,
                  solBalance: 0,
                  solBalanceLoaded: !1,
                  userWsolAccountInfo: null,
                  combinedSolBalanceDisplay: "0",
                  creatorFeeBalanceDisplay: "0",
                  creatorFeeBalanceUsdcDisplay: "0",
                  creatorVaultAccountInfo: null,
                  creatorVaultUsdcAta: null,
                  coinCreatorVaultAta: null,
                  coinCreatorVaultUsdcAta: null,
                },
              })),
              t().handleWalletChange(n));
          },
          acquire: (n) => {
            let a = ej(n),
              o = (0, eG.c)(),
              r = Date.now();
            return (
              e(
                (e) => (
                  e.holdersBySubKey[a.subKey] ||
                    (e.holdersBySubKey[a.subKey] = new Set()),
                  e.holdersBySubKey[a.subKey].add(o),
                  (e.leaseMeta[o] = {
                    subKey: a.subKey,
                    lastSeenAt: r,
                    createdAt: r,
                  }),
                  e.subscriptions[a.subKey]
                    ? ((e.subscriptions[a.subKey].desired = !0),
                      (e.subscriptions[a.subKey].pendingUnsubAt = null))
                    : (e.subscriptions[a.subKey] = {
                        desired: !0,
                        active: !1,
                        rpcSubId: null,
                        lease: a,
                        lastMessageAt: null,
                        lastSubscribedAt: null,
                        lastUnsubscribedAt: null,
                        pendingUnsubAt: null,
                        activeGeneration: null,
                        abortController: null,
                      }),
                  e
                ),
              ),
              t().ensureSubscribed(a.subKey),
              { token: o, release: () => t().releaseLease(o) }
            );
          },
          touchLease: (t) => {
            e(
              (e) => (
                e.leaseMeta[t] && (e.leaseMeta[t].lastSeenAt = Date.now()),
                e
              ),
            );
          },
          releaseLease: (n) => {
            let a = t().leaseMeta[n];
            if (!a) return;
            let o = a.subKey;
            e(
              (e) => (
                e.holdersBySubKey[o]?.delete(n),
                delete e.leaseMeta[n],
                0 === (e.holdersBySubKey[o]?.size ?? 0) &&
                  e.subscriptions[o] &&
                  ((e.subscriptions[o].desired = !1),
                  (e.subscriptions[o].pendingUnsubAt =
                    Date.now() + e.unsubscribeDelayMs)),
                e
              ),
            );
          },
          ensureSubscribed: (n) => {
            let a = t(),
              o = a.subscriptions[n];
            if (!o || o.active) return;
            let {
                lease: { lease: s },
              } = o,
              u = a.generation,
              { connection: p } = a;
            if (!p) return;
            let _ = new AbortController();
            switch (
              (e(
                (e) => (
                  e.subscriptions[n] &&
                    ((e.subscriptions[n].active = !0),
                    (e.subscriptions[n].activeGeneration = u),
                    (e.subscriptions[n].lastSubscribedAt = Date.now()),
                    (e.subscriptions[n].abortController = _)),
                  e
                ),
              ),
              s.tag)
            ) {
              case eK.SOL_BALANCE: {
                let o = a.user.address;
                if (!o)
                  return void e(
                    (e) => (
                      e.subscriptions[n] && (0, eG.o)(e.subscriptions[n]),
                      e
                    ),
                  );
                let r = (0, eG.W)({
                  connection: p,
                  pubkey: o,
                  deliver: (a) =>
                    ((a) => {
                      if (_.signal.aborted) return;
                      let o = t().subscriptions[n];
                      o &&
                        o.active &&
                        (e(
                          (e) => (
                            (e.user.solBalance = a),
                            (e.user.solBalanceLoaded = !0),
                            e.subscriptions[n] &&
                              (e.subscriptions[n].lastMessageAt = Date.now()),
                            e
                          ),
                        ),
                        t().updateUserCombinedBalance());
                    })(a?.lamports ?? 0),
                });
                r.refresh().catch(e4(n, _.signal));
                let i = p.onAccountChange(o, r.onChange);
                (e0(n, r.refresh, _.signal),
                  e(
                    (e) => (
                      e.subscriptions[n] && (e.subscriptions[n].rpcSubId = i),
                      e
                    ),
                  ));
                break;
              }
              case eK.TOKEN_BALANCE: {
                let o = a.user.address;
                if (!o)
                  return void e(
                    (e) => (
                      e.subscriptions[n] && (0, eG.o)(e.subscriptions[n]),
                      e
                    ),
                  );
                let r = s.data.mint,
                  i = (0, c.h)(r, o, !0, s.data.tokenProgram),
                  u = (0, eG.W)({
                    connection: p,
                    pubkey: i,
                    deliver: (a) => {
                      if (_.signal.aborted) return;
                      let o = t().subscriptions[n];
                      if (!o || !o.active) return;
                      let i = (0, eG.I)(a),
                        u = Date.now();
                      e(
                        (e) => (
                          (e.tokenBalanceByMint[r.toBase58()] = i
                            ? {
                                tokenProgram: s.data.tokenProgram,
                                balanceRaw: i.amount,
                                balance: Number(i.amount) / 1e6,
                                doesTokenAccountExist: !0,
                                updatedAt: u,
                              }
                            : {
                                tokenProgram: s.data.tokenProgram,
                                balanceRaw: BigInt(0),
                                balance: 0,
                                doesTokenAccountExist: !1,
                                updatedAt: u,
                              }),
                          (e.lastUpdatedByKey[n] = u),
                          e.subscriptions[n] &&
                            (e.subscriptions[n].lastMessageAt = u),
                          e
                        ),
                      );
                    },
                  });
                u.refresh().catch(e4(n, _.signal));
                let m = p.onAccountChange(i, u.onChange);
                (e0(n, u.refresh, _.signal),
                  e(
                    (e) => (
                      e.subscriptions[n] && (e.subscriptions[n].rpcSubId = m),
                      e
                    ),
                  ));
                break;
              }
              case eK.USER_ACCOUNTS: {
                let a = s.data.address;
                if (!a)
                  return void e(
                    (e) => (
                      e.subscriptions[n] && (0, eG.o)(e.subscriptions[n]),
                      e
                    ),
                  );
                let o = (a) => (o) => {
                    let r = t().subscriptions[n];
                    r &&
                      r.active &&
                      (a(o),
                      e(
                        (e) => (
                          e.subscriptions[n] &&
                            (e.subscriptions[n].lastMessageAt = Date.now()),
                          e
                        ),
                      ));
                  },
                  u = (0, c.h)(m.w, a, !0),
                  l = (0, r.r)(a),
                  d = (0, i.P)((0, i.E)(a), m.w, m.z),
                  y = (0, eR.p)(),
                  f = (0, c.h)(y, l, !0, m.z),
                  b = (0, i.P)((0, i.E)(a), y, m.z),
                  g = (n) =>
                    o((a) => {
                      let o = (0, eG.I)(a);
                      (e(
                        (e) => (
                          (e.user[n] = o
                            ? { accountInfo: a, decodedAccount: o }
                            : null),
                          e
                        ),
                      ),
                        t().updateUserCreatorFeeBalance());
                    });
                (0, eG.L)(
                  p,
                  [
                    {
                      pubkey: u,
                      callback: o((n) => {
                        let a = (0, eG.I)(n);
                        (e(
                          (e) => (
                            (e.user.userWsolAccountInfo = a
                              ? { accountInfo: n, decodedAccount: a }
                              : null),
                            e
                          ),
                        ),
                          t().updateUserCombinedBalance());
                      }),
                    },
                    {
                      pubkey: l,
                      callback: o((n) => {
                        (e((e) => ((e.user.creatorVaultAccountInfo = n), e)),
                          t().updateUserCreatorFeeBalance());
                      }),
                    },
                    {
                      pubkey: d,
                      callback: o((n) => {
                        let a = (0, eG.I)(n);
                        (e(
                          (e) => (
                            (e.user.coinCreatorVaultAta = a
                              ? { accountInfo: n, decodedAccount: a }
                              : null),
                            e
                          ),
                        ),
                          t().updateUserCreatorFeeBalance());
                      }),
                    },
                    { pubkey: f, callback: g("creatorVaultUsdcAta") },
                    { pubkey: b, callback: g("coinCreatorVaultUsdcAta") },
                  ],
                  _.signal,
                )
                  .then((e) => e0(n, e, _.signal))
                  .catch(e4(n, _.signal));
                break;
              }
              case eK.COIN_ACCOUNTS: {
                let o = s.data.mint,
                  u = s.data.tokenProgram,
                  m = (0, eR.k)(s.data.quoteMint),
                  l = (0, eG.b)(m, s.data.quoteTokenProgram),
                  y = a.user.address,
                  f = o.toBase58();
                l &&
                  e((e) => {
                    let t = e.coinsByMint[f];
                    return (t && (t.quoteTokenProgram = l), e);
                  });
                let b = (0, r.G)(o),
                  g = eY({
                    mintKey: o,
                    quoteMintKey: m,
                    poolAddress: s.data.poolAddress,
                  }),
                  h = (0, c.h)(o, g, !0, u),
                  k = (0, eG.q)({
                    quoteMintKey: m,
                    poolKey: g,
                    quoteTokenProgramKey: l,
                  }),
                  v = [],
                  w = (a) => (o) => {
                    let r = t(),
                      i = r.subscriptions[n];
                    i &&
                      i.active &&
                      r.coinsByMint[f] &&
                      (a(o),
                      e(
                        (e) => (
                          e.subscriptions[n] &&
                            (e.subscriptions[n].lastMessageAt = Date.now()),
                          e
                        ),
                      ));
                  };
                if (
                  (v.push({
                    pubkey: b,
                    callback: w((t) => {
                      let n = (0, eG.i)(
                        (e) => r.A.decodeBondingCurveNullable(e),
                        t,
                      );
                      e((e) => {
                        let a = e.coinsByMint[f];
                        return (
                          a &&
                            ((a.bondingCurveAccountInfo = t),
                            (a.bondingCurve = n)),
                          e
                        );
                      });
                    }),
                  }),
                  v.push({
                    pubkey: g,
                    callback: w((t) => {
                      let n = (0, eG.i)((e) => i.q.decodePoolNullable(e), t);
                      e((e) => {
                        let a = e.coinsByMint[f];
                        return (
                          a && ((a.poolAccountInfo = t), (a.pool = n)),
                          e
                        );
                      });
                    }),
                  }),
                  v.push({
                    pubkey: o,
                    callback: w((t) => {
                      let n = (0, eG.r)(t.data);
                      e((e) => {
                        let a = e.coinsByMint[f];
                        return (
                          a &&
                            (a.mintAccount = n
                              ? { accountInfo: t, decodedAccount: n }
                              : null),
                          e
                        );
                      });
                    }),
                  }),
                  v.push({
                    pubkey: h,
                    callback: w((t) => {
                      let n = (0, eG.G)(t.data);
                      e((e) => {
                        let a = e.coinsByMint[f];
                        return (
                          a &&
                            (a.poolBaseTokenAccount = n
                              ? { accountInfo: t, decodedAccount: n }
                              : null),
                          e
                        );
                      });
                    }),
                  }),
                  k &&
                    v.push({
                      pubkey: k,
                      callback: w((t) => {
                        let n = (0, eG.G)(t.data);
                        e((e) => {
                          let a = e.coinsByMint[f];
                          return (
                            a &&
                              ((a.poolQuoteTokenAccount = n
                                ? { accountInfo: t, decodedAccount: n }
                                : null),
                              (a.quoteTokenProgram = t.owner)),
                            e
                          );
                        });
                      }),
                    }),
                  y)
                ) {
                  let a = (0, c.h)(o, y, !0, u);
                  v.push({
                    pubkey: a,
                    callback: w((n) => {
                      let a = (0, eG.G)(n.data),
                        o = a ? new d.default(a.amount.toString()) : null,
                        r = t(),
                        i =
                          r.coinsByMint[f]?.mintAccount?.decodedAccount
                            ?.decimals ?? 6,
                        s = a?.amount ?? BigInt(0);
                      e((e) => {
                        let t = e.coinsByMint[f];
                        return (
                          t &&
                            ((t.associatedUserAccountInfo = a
                              ? { accountInfo: n, decodedAccount: a }
                              : null),
                            (t.tokenBalance = o),
                            (e.tokenBalanceByMint[f] = {
                              tokenProgram: u,
                              balanceRaw: s,
                              balance: Number(s) / Math.pow(10, i),
                              doesTokenAccountExist: null !== a,
                              updatedAt: Date.now(),
                            })),
                          e
                        );
                      });
                    }),
                    onNull: () => {
                      let a = t(),
                        o = a.subscriptions[n];
                      o &&
                        o.active &&
                        a.coinsByMint[f] &&
                        e((e) => {
                          let t = e.coinsByMint[f];
                          if (!t) return e;
                          ((t.associatedUserAccountInfo = null),
                            (t.tokenBalance = null));
                          let a = Date.now();
                          return (
                            (e.tokenBalanceByMint[f] = {
                              tokenProgram: u,
                              balanceRaw: BigInt(0),
                              balance: 0,
                              doesTokenAccountExist: !1,
                              updatedAt: a,
                            }),
                            e.subscriptions[n] &&
                              (e.subscriptions[n].lastMessageAt = a),
                            e
                          );
                        });
                    },
                  });
                }
                (0, eG.L)(p, v, _.signal)
                  .then((e) => e0(n, e, _.signal))
                  .catch(e4(n, _.signal));
                break;
              }
              case eK.RAYDIUM_POOL: {
                let a = s.data.mint,
                  o = s.data.marketId,
                  r = a.toBase58(),
                  i = (a) => (o) => {
                    let r = t().subscriptions[n];
                    r &&
                      r.active &&
                      (a(o),
                      e(
                        (e) => (
                          e.subscriptions[n] &&
                            (e.subscriptions[n].lastMessageAt = Date.now()),
                          e
                        ),
                      ));
                  };
                (async () => {
                  try {
                    let [s, u] = await p.getMultipleAccountsInfo([o, a]);
                    if (_.signal.aborted) return;
                    if (!s)
                      return void console.warn(
                        "[BlockchainStore] RAYDIUM_POOL: market account missing",
                        o.toBase58(),
                      );
                    let c = await eX();
                    if (_.signal.aborted) return;
                    let d = c.decodeRaydiumMarketStateV3(s.data),
                      y = c.resolveRaydiumInverted(d, a),
                      f = u ? ((0, eG.r)(u.data)?.decimals ?? eG.K) : eG.K,
                      b = m.w,
                      g = y ? a : b,
                      h = y ? b : a,
                      k = y ? f : eG.f,
                      v = y ? eG.f : f,
                      w = c.getAssociatedRaydiumV4PoolKeys({
                        marketId: o,
                        baseMint: g,
                        quoteMint: h,
                        baseDecimals: k,
                        quoteDecimals: v,
                        programId: e_.D,
                        marketProgramId: e_.T,
                      }),
                      A = {
                        id: w.id,
                        baseMint: w.quoteMint,
                        quoteMint: w.baseMint,
                        lpMint: w.lpMint,
                        baseDecimals: v,
                        quoteDecimals: k,
                        lpDecimals: 6,
                        version: 4,
                        programId: e_.D,
                        authority: w.authority,
                        openOrders: w.openOrders,
                        targetOrders: w.targetOrders,
                        baseVault: w.baseVault,
                        quoteVault: w.quoteVault,
                        withdrawQueue: w.withdrawQueue,
                        lpVault: w.lpVault,
                        marketVersion: 3,
                        marketProgramId: e_.T,
                        marketId: w.marketId,
                        marketAuthority: w.marketAuthority,
                        marketBaseVault: d.baseVault,
                        marketQuoteVault: d.quoteVault,
                        marketBids: d.bids,
                        marketAsks: d.asks,
                        marketEventQueue: d.eventQueue,
                        lookupTableAccount: new l.PublicKey(
                          "11111111111111111111111111111111",
                        ),
                      };
                    if (_.signal.aborted) return;
                    {
                      let e = t().subscriptions[n];
                      if (!e || !e.active || e.abortController !== _) return;
                    }
                    e((e) => {
                      e.coinsByMint[r] ||
                        (e.coinsByMint[r] = {
                          mint: a,
                          tokenProgram: m.z,
                          bondingCurveAccountInfo: null,
                          bondingCurve: null,
                          poolAccountInfo: null,
                          pool: null,
                          mintAccount: null,
                          poolBaseTokenAccount: null,
                          poolQuoteTokenAccount: null,
                          quoteTokenProgram: null,
                          associatedUserAccountInfo: null,
                          tokenBalance: null,
                          raydium: null,
                        });
                      let t = e.coinsByMint[r];
                      return (
                        (t.raydium = {
                          poolKeys: A,
                          marketState: d,
                          baseVaultAccount: t.raydium?.baseVaultAccount ?? null,
                          quoteVaultAccount:
                            t.raydium?.quoteVaultAccount ?? null,
                          inverted: y,
                        }),
                        e
                      );
                    });
                    let C = [
                      {
                        pubkey: A.baseVault,
                        callback: i((t) => {
                          let n = (0, eG.G)(t.data);
                          e((e) => {
                            let a = e.coinsByMint[r];
                            return (
                              a?.raydium &&
                                (a.raydium.baseVaultAccount = n
                                  ? { accountInfo: t, decodedAccount: n }
                                  : null),
                              e
                            );
                          });
                        }),
                      },
                      {
                        pubkey: A.quoteVault,
                        callback: i((t) => {
                          let n = (0, eG.G)(t.data);
                          e((e) => {
                            let a = e.coinsByMint[r];
                            return (
                              a?.raydium &&
                                (a.raydium.quoteVaultAccount = n
                                  ? { accountInfo: t, decodedAccount: n }
                                  : null),
                              e
                            );
                          });
                        }),
                      },
                      {
                        pubkey: o,
                        callback: i((t) => {
                          try {
                            let n = eJ;
                            if (!n) return;
                            let a = n.decodeRaydiumMarketStateV3(t.data);
                            e((e) => {
                              let t = e.coinsByMint[r];
                              return (
                                t?.raydium?.poolKeys &&
                                  ((t.raydium.marketState = a),
                                  (t.raydium.poolKeys = {
                                    ...t.raydium.poolKeys,
                                    marketBaseVault: a.baseVault,
                                    marketQuoteVault: a.quoteVault,
                                    marketBids: a.bids,
                                    marketAsks: a.asks,
                                    marketEventQueue: a.eventQueue,
                                  })),
                                e
                              );
                            });
                          } catch (e) {
                            console.warn(
                              "[BlockchainStore] failed to decode market state",
                              e,
                            );
                          }
                        }),
                      },
                    ];
                    (0, eG.L)(p, C, _.signal)
                      .then((e) => e0(n, e, _.signal))
                      .catch(e4(n, _.signal));
                  } catch (e) {
                    console.error(
                      "[BlockchainStore] RAYDIUM_POOL setup failed:",
                      e,
                    );
                  }
                })();
              }
            }
          },
          ensureUnsubscribed: (n) => {
            let a = t(),
              o = a.subscriptions[n];
            o &&
              o.active &&
              (o.abortController && o.abortController.abort(),
              null !== o.rpcSubId &&
                a.connection &&
                a.connection.removeAccountChangeListener(o.rpcSubId),
              e((e) => {
                if (
                  (e.subscriptions[n] && (0, eG.o)(e.subscriptions[n]),
                  o.lease.lease.tag === eK.COIN_ACCOUNTS)
                ) {
                  let t = o.lease.lease.data.mint.toBase58(),
                    a = e.coinsByMint[t],
                    r = `${eK.COIN_ACCOUNTS}:${t}:`,
                    i = `${eK.COIN_ACCOUNTS}:${t}`,
                    s = !1;
                  for (let t of Object.keys(e.subscriptions))
                    if (
                      t !== n &&
                      (t === i || t.startsWith(r)) &&
                      (e.subscriptions[t]?.active ||
                        (e.holdersBySubKey[t]?.size ?? 0) > 0)
                    ) {
                      s = !0;
                      break;
                    }
                  if (s) return e;
                  let u = `${eK.RAYDIUM_POOL}:${t}:`,
                    c = 0,
                    m = !1;
                  for (let n of Object.keys(e.holdersBySubKey))
                    (n === `${eK.RAYDIUM_POOL}:${t}` || n.startsWith(u)) &&
                      (c += e.holdersBySubKey[n]?.size ?? 0);
                  for (let n of Object.keys(e.subscriptions))
                    (n === `${eK.RAYDIUM_POOL}:${t}` || n.startsWith(u)) &&
                      e.subscriptions[n]?.active &&
                      (m = !0);
                  (a && (c > 0 || m)
                    ? (e.coinsByMint[t] = {
                        mint: a.mint,
                        tokenProgram: a.tokenProgram,
                        bondingCurveAccountInfo: null,
                        bondingCurve: null,
                        poolAccountInfo: null,
                        pool: null,
                        mintAccount: null,
                        poolBaseTokenAccount: null,
                        poolQuoteTokenAccount: null,
                        quoteTokenProgram: a.quoteTokenProgram,
                        associatedUserAccountInfo: null,
                        tokenBalance: null,
                        raydium: a.raydium,
                      })
                    : delete e.coinsByMint[t],
                    delete e.tokenBalanceByMint[t]);
                }
                if (o.lease.lease.tag === eK.RAYDIUM_POOL) {
                  let t = o.lease.lease.data.mint.toBase58(),
                    a = e.coinsByMint[t];
                  if (a) {
                    let o = `${eK.RAYDIUM_POOL}:${t}:`,
                      r = `${eK.RAYDIUM_POOL}:${t}`,
                      i = !1;
                    for (let t of Object.keys(e.subscriptions))
                      if (
                        t !== n &&
                        (t === r || t.startsWith(o)) &&
                        (e.subscriptions[t]?.active ||
                          (e.holdersBySubKey[t]?.size ?? 0) > 0)
                      ) {
                        i = !0;
                        break;
                      }
                    if (i);
                    else {
                      let n = `${eK.COIN_ACCOUNTS}:${t}`,
                        o = e.holdersBySubKey[n]?.size ?? 0,
                        r = e.subscriptions[n]?.active ?? !1;
                      o > 0 || r
                        ? (a.raydium = null)
                        : (delete e.coinsByMint[t],
                          delete e.tokenBalanceByMint[t]);
                    }
                  }
                }
                return e;
              }));
          },
          reconcileDesiredSubscriptions: () => {
            let e = t();
            for (let n of Object.keys(e.subscriptions)) {
              let a = e.holdersBySubKey[n]?.size ?? 0,
                o = e.subscriptions[n];
              a > 0 && !o.active && t().ensureSubscribed(n);
            }
          },
          runUnsubGc: () => {
            let n = t(),
              a = Date.now();
            for (let o of Object.keys(n.subscriptions)) {
              let r = n.subscriptions[o];
              0 === (n.holdersBySubKey[o]?.size ?? 0) &&
                null !== r.pendingUnsubAt &&
                a >= r.pendingUnsubAt &&
                (t().ensureUnsubscribed(o),
                e(
                  (e) => (
                    e.subscriptions[o] && (0, eG.o)(e.subscriptions[o]),
                    e
                  ),
                ));
            }
          },
          runLeaseGc: () => {
            let e = t(),
              n = Date.now(),
              { leaseTtlMs: a } = e.leaseGcConfig;
            for (let o of Object.keys(e.leaseMeta))
              n - e.leaseMeta[o].lastSeenAt > a && t().releaseLease(o);
          },
          startGcTimers: () => {
            if (t().gcTimerRef) return;
            let n = setInterval(() => {
              (t().runUnsubGc(), t().runLeaseGc());
            }, 1e4);
            e((e) => ((e.gcTimerRef = n), e));
          },
          stopGcTimers: () => {
            let n = t();
            n.gcTimerRef &&
              (clearInterval(n.gcTimerRef),
              e((e) => ((e.gcTimerRef = null), e)));
          },
          handleWalletChange: (n) => {
            let a = t();
            if (a.currentWallet !== n) {
              for (let e of Object.values(a.subscriptions))
                (e.abortController && e.abortController.abort(),
                  e.active &&
                    null !== e.rpcSubId &&
                    a.connection &&
                    a.connection.removeAccountChangeListener(e.rpcSubId));
              (e((e) => {
                for (let t of ((e.generation += 1),
                (e.currentWallet = n),
                (e.tokenBalanceByMint = {}),
                Object.keys(e.coinsByMint)))
                  ((e.coinsByMint[t].associatedUserAccountInfo = null),
                    (e.coinsByMint[t].tokenBalance = null));
                for (let t of ((e.lastUpdatedByKey = {}),
                Object.keys(e.subscriptions)))
                  (0, eG.o)(e.subscriptions[t]);
                return e;
              }),
                n && t().reconcileDesiredSubscriptions());
            }
          },
          refreshAccountsOnUse: (e) => {
            let n,
              { connection: a } = t();
            if (!a || "boolean" != typeof (n = a._rpcWebSocketConnected) || n)
              return;
            let o = Date.now();
            o - (e9.get(e) ?? 0) < 3e3 ||
              (e9.set(e, o), t().refreshAccountsForMint(e));
          },
          reconcileAccountsAfterTrade: (e) => {
            for (let n of e6)
              setTimeout(() => {
                t().refreshAccountsForMint(e);
              }, n);
          },
          refreshAccountsForMint: async (e) => {
            await Promise.allSettled(
              [...e1.keys()]
                .filter(
                  (t) =>
                    t === eK.SOL_BALANCE ||
                    t.startsWith(`${eK.USER_ACCOUNTS}:`) ||
                    t === `${eK.TOKEN_BALANCE}:${e}` ||
                    t === `${eK.RAYDIUM_POOL}:${e}` ||
                    t === `${eK.COIN_ACCOUNTS}:${e}` ||
                    t.startsWith(`${eK.COIN_ACCOUNTS}:${e}:`),
                )
                .map((e) => e1.get(e)?.()),
            );
          },
          handleWebSocketReopen: () => {
            let n = t();
            for (let e of Object.values(n.subscriptions))
              e.active &&
                (e.abortController?.abort(),
                null !== e.rpcSubId &&
                  n.connection &&
                  n.connection.removeAccountChangeListener(e.rpcSubId));
            (e((e) => {
              for (let t of ((e.generation += 1), Object.keys(e.subscriptions)))
                e.subscriptions[t].active && (0, eG.o)(e.subscriptions[t]);
              return e;
            }),
              t().reconcileDesiredSubscriptions());
          },
          setCoinMint: (n, a, o, r, i) => {
            let s, u, c, d;
            if (!n) return null;
            try {
              s = new l.PublicKey(n);
            } catch {
              return (
                console.error("[BlockchainStore] Invalid mint address:", n),
                null
              );
            }
            let p = m.z;
            if (a)
              try {
                p = new l.PublicKey(a);
              } catch {
                console.warn(
                  "[BlockchainStore] Invalid token program address, using default:",
                  a,
                );
              }
            if (o)
              try {
                u = new l.PublicKey(o);
              } catch {
                console.warn(
                  "[BlockchainStore] Invalid quote mint address, defaulting to NATIVE_MINT:",
                  o,
                );
              }
            if (r)
              try {
                c = new l.PublicKey(r);
              } catch {
                console.warn(
                  "[BlockchainStore] Invalid pool address, defaulting to canonical pool PDA:",
                  r,
                );
              }
            if (i)
              try {
                d = new l.PublicKey(i);
              } catch {
                console.warn(
                  "[BlockchainStore] Invalid quote token program, leaving it unset (an exotic quote skips its pool quote ATA subscription):",
                  i,
                );
              }
            let _ = s.toBase58(),
              y = {
                mint: s,
                tokenProgram: p,
                quoteMint: u,
                poolAddress: c,
                quoteTokenProgram: d,
              },
              f = ej({ tag: eK.COIN_ACCOUNTS, data: y }).subKey,
              b = t().subscriptions[f];
            b?.active ||
              e((e) => {
                let t = e.coinsByMint[_]?.raydium ?? null;
                return (
                  (e.coinsByMint[_] = {
                    mint: s,
                    tokenProgram: p,
                    bondingCurveAccountInfo: null,
                    bondingCurve: null,
                    poolAccountInfo: null,
                    pool: null,
                    mintAccount: null,
                    poolBaseTokenAccount: null,
                    poolQuoteTokenAccount: null,
                    quoteTokenProgram: d ?? null,
                    associatedUserAccountInfo: null,
                    tokenBalance: null,
                    raydium: t,
                  }),
                  e
                );
              });
            let { release: g, token: h } = t().acquire({
              tag: eK.COIN_ACCOUNTS,
              data: y,
            });
            return { release: g, token: h };
          },
          setCoinRaydiumPool: (n, a) => {
            let o, r;
            try {
              ((o = new l.PublicKey(n)), (r = new l.PublicKey(a)));
            } catch {
              return (
                console.error(
                  "[BlockchainStore] setCoinRaydiumPool: invalid mint or marketId",
                  { mint: n, marketId: a },
                ),
                null
              );
            }
            let i = o.toBase58();
            e(
              (e) => (
                e.coinsByMint[i] ||
                  (e.coinsByMint[i] = {
                    mint: o,
                    tokenProgram: m.z,
                    bondingCurveAccountInfo: null,
                    bondingCurve: null,
                    poolAccountInfo: null,
                    pool: null,
                    mintAccount: null,
                    poolBaseTokenAccount: null,
                    poolQuoteTokenAccount: null,
                    quoteTokenProgram: null,
                    associatedUserAccountInfo: null,
                    tokenBalance: null,
                    raydium: null,
                  }),
                e
              ),
            );
            let { release: s, token: u } = t().acquire({
              tag: eK.RAYDIUM_POOL,
              data: { mint: o, marketId: r },
            });
            return { release: s, token: u };
          },
          getCurveState: (e) => {
            let n = t(),
              { global: a } = n,
              o = n.coinsByMint[e];
            if (!o) return null;
            if (o.bondingCurve && !o.bondingCurve.complete) {
              let e = o.bondingCurve,
                t = a.global?.decodedAccount,
                n = a.feeConfig?.decodedAccount;
              if (!t || !n) return null;
              let i = BigInt(e.virtualQuoteReserves.toString()),
                s = BigInt(e.virtualTokenReserves.toString()),
                u = BigInt(e.realQuoteReserves.toString()),
                c = BigInt(e.realTokenReserves.toString());
              if (s === BigInt(0)) return null;
              let m = o.mintAccount
                  ? BigInt(o.mintAccount.decodedAccount.supply.toString())
                  : BigInt(t.tokenTotalSupply.toString()),
                l = new d.default(m.toString()),
                p = (0, r.M)({
                  mintSupply: l,
                  virtualQuoteReserves: e.virtualQuoteReserves,
                  virtualTokenReserves: e.virtualTokenReserves,
                }),
                _ = (0, r.F)({
                  feeConfig: n,
                  quoteMint: e.quoteMint,
                  marketCap: p,
                }),
                { creatorFeeBps: y } = (0, r.l)({
                  global: t,
                  feeConfig: n,
                  mintSupply: l,
                  virtualQuoteReserves: e.virtualQuoteReserves,
                  virtualTokenReserves: e.virtualTokenReserves,
                  quoteMint: e.quoteMint,
                  creatorFeeBps: e.creatorFeeBps,
                }),
                f = BigInt(y.toNumber());
              return {
                virtualSolReserves: i,
                virtualTokenReserves: s,
                realSolReserves: u,
                realTokenReserves: c,
                totalFeeBasisPoints: BigInt(
                  _.protocolFeeBps.toNumber() +
                    y.toNumber() +
                    _.lpFeeBps.toNumber(),
                ),
                creatorFeeBasisPoints: f,
              };
            }
            if (o.pool && o.poolBaseTokenAccount && o.poolQuoteTokenAccount) {
              let e = o.poolQuoteTokenAccount.decodedAccount,
                t = o.poolBaseTokenAccount.decodedAccount,
                n = a.ammFeeConfig?.decodedAccount;
              if (!n) return null;
              let i = BigInt(e.amount.toString()),
                s = BigInt(t.amount.toString()),
                u = new d.default(
                  o.mintAccount
                    ? o.mintAccount.decodedAccount.supply.toString()
                    : "1000000000000000",
                ),
                c = (0, r.M)({
                  mintSupply: u,
                  virtualQuoteReserves: new d.default(i.toString()),
                  virtualTokenReserves: new d.default(s.toString()),
                }),
                m = (0, r.F)({
                  feeConfig: n,
                  quoteMint: o.pool.quoteMint,
                  marketCap: c,
                }),
                l = (0, eG.$)(o.poolAccountInfo),
                p =
                  (0, eG.t)(a.globalConfig?.accountInfo) && l > 0
                    ? l
                    : m.creatorFeeBps.toNumber();
              return {
                virtualSolReserves: i,
                virtualTokenReserves: s,
                realSolReserves: i,
                realTokenReserves: s,
                totalFeeBasisPoints: BigInt(
                  m.protocolFeeBps.toNumber() + p + m.lpFeeBps.toNumber(),
                ),
                creatorFeeBasisPoints: BigInt(p),
              };
            }
            return null;
          },
          getSolBalance: () => {
            let e = t();
            return {
              balanceLamports: BigInt(e.user.solBalance),
              balance: e.user.solBalance / l.LAMPORTS_PER_SOL,
            };
          },
          getTokenBalance: (e) => {
            let n = t(),
              a = n.tokenBalanceByMint[e];
            if (a) return a;
            let o = n.coinsByMint[e];
            if (o?.associatedUserAccountInfo?.decodedAccount) {
              let e = o.associatedUserAccountInfo.decodedAccount,
                t = o.mintAccount?.decodedAccount?.decimals ?? eG.K;
              return {
                tokenProgram: o.mintAccount?.accountInfo.owner ?? m.z,
                balanceRaw: e.amount,
                balance: Number(e.amount) / Math.pow(10, t),
                doesTokenAccountExist: !0,
                updatedAt: Date.now(),
              };
            }
            return null;
          },
          getQuote: async ({
            direction: e,
            uiAmount: n,
            inputAtomicAmount: a,
            slippagePercentage: o,
            mint: s,
            coin: u,
            inputSide: c,
          }) => {
            let m = t();
            if (!s || !n || n <= 0 || !Number.isFinite(n) || !u)
              return (
                console.warn("[BlockchainStore] getQuote: Invalid inputs", {
                  mint: s,
                  uiAmount: n,
                  coin: u,
                }),
                null
              );
            let p = m.coinsByMint[s];
            if (!p)
              return (
                console.warn(
                  "[BlockchainStore] getQuote called but coin not loaded for mint:",
                  s,
                ),
                null
              );
            let { global: _ } = m,
              y = _.global?.decodedAccount,
              f = _.feeConfig?.decodedAccount,
              b = _.globalConfig?.decodedAccount,
              g = _.ammFeeConfig?.decodedAccount,
              h = p.bondingCurve,
              k = p.pool,
              v = p.poolBaseTokenAccount?.decodedAccount,
              w = p.poolQuoteTokenAccount?.decodedAccount,
              A = p.mintAccount?.decodedAccount,
              C = p.mint;
            if (!y || !C)
              return (
                console.warn(
                  "[BlockchainStore] getQuote: Missing global or mint data",
                ),
                null
              );
            let P = "buy" === e,
              B = "token" === (c ?? (P ? "native" : "token")),
              S = (0, eR.k)(
                u.quote_mint ? new l.PublicKey(u.quote_mint) : void 0,
              );
            if ((0, eR.Z)(S) || (0, eR.Z)((0, eR.k)(h?.quoteMint))) return null;
            let E = (0, eR.N)(S);
            if (void 0 === E) return null;
            let T = B ? eG.K : E;
            try {
              let e,
                t,
                c = a ?? (0, eG.v)(n, T);
              if (null === c)
                return (
                  console.warn(
                    "[BlockchainStore] getQuote: amount not representable as atomic",
                    { mint: s, uiAmount: n, decimals: T },
                  ),
                  null
                );
              let m = new d.default(c.toString()),
                l = BigInt((0, eG.u)(o));
              if (
                u.raydium_pool &&
                !u.pump_swap_pool &&
                (!p.raydium?.poolKeys ||
                  !p.raydium.baseVaultAccount ||
                  !p.raydium.quoteVaultAccount)
              )
                return null;
              if (
                !k &&
                p.raydium?.poolKeys &&
                p.raydium.baseVaultAccount &&
                p.raydium.quoteVaultAccount &&
                (!h || !0 === h.complete)
              ) {
                let { computeRaydiumQuote: e } = await eX(),
                  t = e({
                    raydium: p.raydium,
                    isBuy: P,
                    isTokenInput: B,
                    uiAmount: n,
                    inputAtomicAmount: a,
                    slippagePercentage: o,
                  });
                if (!t) return null;
                return { quote: t, priceImpactPercent: null };
              }
              if (null != u.program && "pump" !== u.program) return null;
              if (P && !B) {
                let e, t;
                if (A && h?.complete)
                  if (k && v && w) {
                    if (!b)
                      return (
                        console.warn(
                          "[BlockchainStore] getQuote: Missing globalConfig for pump swap",
                        ),
                        null
                      );
                    let n = (0, eu.b)(v),
                      { base: a } = (0, i.m)({
                        quote: m,
                        slippage: 0,
                        baseReserve: n,
                        quoteReserve: (0, eu.b)(w),
                        globalConfig: b,
                        baseMintAccount: A,
                        virtualQuoteReserves: k.virtualQuoteReserves,
                        baseMint: C,
                        coinCreator: k.coinCreator,
                        creator: k.creator,
                        feeConfig: g ?? null,
                      });
                    ((e = a), (t = n));
                  } else {
                    if (!b)
                      return (
                        console.warn(
                          "[BlockchainStore] getQuote: Missing globalConfig for pump swap",
                        ),
                        null
                      );
                    let n = y.tokenTotalSupply.sub(y.initialRealTokenReserves),
                      a = h.realQuoteReserves.sub(y.poolMigrationFee),
                      { base: o } = (0, i.m)({
                        quote: m,
                        slippage: 0,
                        baseReserve: n,
                        quoteReserve: a,
                        globalConfig: b,
                        baseMintAccount: A,
                        baseMint: C,
                        virtualQuoteReserves:
                          k?.virtualQuoteReserves ?? new d.default(0),
                        coinCreator: h.creator,
                        creator: (0, r.z)(C),
                        feeConfig: g ?? null,
                      });
                    ((e = o), (t = n));
                  }
                else
                  ((e = (0, r.Y)({
                    global: y,
                    feeConfig: f ?? null,
                    mintSupply: A ? (0, eu.B)(A) : null,
                    bondingCurve: h ?? null,
                    amount: m,
                    quoteMint: S,
                  })),
                    (t =
                      h && A
                        ? h.virtualTokenReserves
                        : y.initialVirtualTokenReserves));
                let n = BigInt(e.toString()),
                  a = (0, eG.s)(n, l, !1);
                return {
                  quote: {
                    amount: n,
                    uiAmount: (0, eG.F)(n, eG.K),
                    minimumOutReceived: a,
                    minimumOutReceivedUiAmount: (0, eG.F)(a, eG.K),
                    inputAmountUsed: BigInt(m.toString()),
                    maxInputAmount: BigInt(m.toString()),
                  },
                  priceImpactPercent: ed({
                    tokensOut: n,
                    tokenReserveBefore: BigInt(t.toString()),
                  }),
                };
              }
              if (P && B) {
                let e, t, n;
                if (A && h?.complete)
                  if (k && v && w) {
                    if (!b)
                      return (
                        console.warn(
                          "[BlockchainStore] getQuote: Missing globalConfig for pump swap",
                        ),
                        null
                      );
                    let a = (0, eu.b)(v),
                      { maxQuote: o } = (0, i.u)({
                        base: m,
                        slippage: 0,
                        baseReserve: a,
                        quoteReserve: (0, eu.b)(w),
                        globalConfig: b,
                        coinCreator: k.coinCreator,
                        creator: k.creator,
                        feeConfig: g ?? null,
                        baseMintAccount: A,
                        virtualQuoteReserves: k.virtualQuoteReserves,
                        baseMint: C,
                      });
                    ((e = o), (n = a), (t = m));
                  } else {
                    if (!b)
                      return (
                        console.warn(
                          "[BlockchainStore] getQuote: Missing globalConfig for pump swap",
                        ),
                        null
                      );
                    let a = y.tokenTotalSupply.sub(y.initialRealTokenReserves),
                      o = h.realQuoteReserves.sub(y.poolMigrationFee),
                      { maxQuote: s } = (0, i.u)({
                        base: m,
                        slippage: 0,
                        baseReserve: a,
                        quoteReserve: o,
                        globalConfig: b,
                        coinCreator: h.creator,
                        creator: (0, r.z)(C),
                        feeConfig: g ?? null,
                        baseMintAccount: A,
                        virtualQuoteReserves:
                          k?.virtualQuoteReserves ?? new d.default(0),
                        baseMint: C,
                      });
                    ((e = s), (n = a), (t = m));
                  }
                else {
                  e = (0, r.S)({
                    global: y,
                    feeConfig: f ?? null,
                    mintSupply: A ? (0, eu.B)(A) : null,
                    bondingCurve: h ?? null,
                    amount: m,
                    quoteMint: S,
                  });
                  let a =
                    h && A
                      ? h
                      : {
                          virtualTokenReserves: y.initialVirtualTokenReserves,
                          realTokenReserves: y.initialRealTokenReserves,
                        };
                  ((n = a.virtualTokenReserves),
                    (t = d.default.min(m, a.realTokenReserves)));
                }
                let a = BigInt(e.toString()),
                  o = (0, eG.s)(a, l, !0);
                return {
                  quote: {
                    amount: a,
                    uiAmount: (0, eG.F)(a, eG.f),
                    minimumOutReceived: BigInt(m.toString()),
                    minimumOutReceivedUiAmount: (0, eG.F)(
                      BigInt(m.toString()),
                      eG.K,
                    ),
                    inputAmountUsed: BigInt(m.toString()),
                    maxInputAmount: o,
                  },
                  priceImpactPercent: ed({
                    tokensOut: BigInt(t.toString()),
                    tokenReserveBefore: BigInt(n.toString()),
                  }),
                };
              }
              let _ = eW({
                hasBondingCurve: !!h,
                bondingCurveComplete: h?.complete,
                hasBaseMintAccount: !!A,
                hasPool: !!k,
                hasPoolBaseTokenAccount: !!v,
                hasPoolQuoteTokenAccount: !!w,
              });
              if ("bondingCurve" === _) {
                if (!h || !A)
                  return (
                    console.warn(
                      "[BlockchainStore] getQuote: Missing bondingCurve or mintAccount for sell",
                    ),
                    null
                  );
                ((e = (0, r.b)({
                  global: y,
                  feeConfig: f ?? null,
                  mintSupply: (0, eu.B)(A),
                  bondingCurve: h,
                  amount: m,
                })),
                  (t = h.virtualTokenReserves));
              } else if ("estimatedPumpSwap" === _) {
                if (!b || !A || !h)
                  return (
                    console.warn(
                      "[BlockchainStore] getQuote: Missing globalConfig or mintAccount for pump swap",
                    ),
                    null
                  );
                let n = y.tokenTotalSupply.sub(y.initialRealTokenReserves),
                  a = h.realQuoteReserves.sub(y.poolMigrationFee),
                  { uiQuote: o } = (0, i.N)({
                    base: m,
                    slippage: 0,
                    baseReserve: n,
                    quoteReserve: a,
                    globalConfig: b,
                    baseMintAccount: A,
                    baseMint: C,
                    virtualQuoteReserves:
                      k?.virtualQuoteReserves ?? new d.default(0),
                    coinCreator: h.creator,
                    creator: (0, r.z)(C),
                    feeConfig: g ?? null,
                  });
                ((e = o), (t = n));
              } else {
                if ("pumpSwap" !== _)
                  return (
                    console.warn(
                      "[BlockchainStore] getQuote: Missing bonding curve or pump swap pool for sell",
                      { mint: s },
                    ),
                    null
                  );
                if (!b || !A || !k || !v || !w)
                  return (
                    console.warn(
                      "[BlockchainStore] getQuote: Missing globalConfig or mintAccount for pump swap",
                    ),
                    null
                  );
                let n = (0, eu.b)(v),
                  { uiQuote: a } = (0, i.N)({
                    base: m,
                    slippage: 0,
                    baseReserve: n,
                    quoteReserve: (0, eu.b)(w),
                    globalConfig: b,
                    baseMintAccount: A,
                    baseMint: C,
                    coinCreator: k.coinCreator,
                    virtualQuoteReserves:
                      k?.virtualQuoteReserves ?? new d.default(0),
                    creator: k.creator,
                    feeConfig: g ?? null,
                  });
                ((e = a), (t = n));
              }
              let E = BigInt(e.toString()),
                q = (0, eG.s)(E, l, !1);
              return {
                quote: {
                  amount: E,
                  uiAmount: (0, eG.F)(E, eG.f),
                  minimumOutReceived: q,
                  minimumOutReceivedUiAmount: (0, eG.F)(q, eG.f),
                  inputAmountUsed: BigInt(m.toString()),
                  maxInputAmount: BigInt(m.toString()),
                },
                priceImpactPercent: (({
                  tokensIn: e,
                  tokenReserveBefore: t,
                }) =>
                  null == t || t <= BigInt(0) || e < BigInt(0)
                    ? null
                    : el({ numerator: e, denominator: t + e }))({
                  tokensIn: BigInt(m.toString()),
                  tokenReserveBefore: BigInt(t.toString()),
                }),
              };
            } catch (e) {
              return (
                console.error("[BlockchainStore] getQuote error:", e),
                null
              );
            }
          },
          getSwapTx: async ({
            mint: e,
            coin: n,
            creator: a,
            uiAmount: o,
            inputAtomicAmount: s,
            tradeDirection: p,
            slippagePercentage: _,
            frontRunningProtection: y = !1,
            tipAmount: f = 1e-4,
            priorityFeeAmount: b,
            feeMode: g = es.f,
            newCoinMetadata: h,
            inputSide: k,
          }) => {
            let v,
              w =
                null != b && Number.isFinite(b)
                  ? Math.floor(b * l.LAMPORTS_PER_SOL)
                  : e_.u,
              A = t(),
              { connection: C, user: P, global: B } = A,
              S = A.coinsByMint[e];
            if (!n || !C || !S)
              return {
                quote: null,
                transaction: null,
                failureReason: "state-not-loaded",
              };
            let E = P.address;
            if (!E)
              return (
                console.warn(
                  "[BlockchainStore] getSwapTx: No user address available",
                ),
                {
                  quote: null,
                  transaction: null,
                  failureReason: "no-user-address",
                }
              );
            let T = "buy" === p,
              q = new l.PublicKey(e),
              M = k ?? (T ? "native" : "token"),
              F = "token" === M,
              I = await t().getQuote({
                direction: p,
                uiAmount: o,
                slippagePercentage: _,
                mint: e,
                coin: n,
                inputSide: M,
                inputAtomicAmount: s,
              });
            if (!I)
              return {
                quote: null,
                transaction: null,
                failureReason: "quote-unavailable",
              };
            try {
              v = await (0, eU.R)(C);
            } catch {
              return (
                console.warn(
                  "[BlockchainStore] getSwapTx: Blockhash refresh failed",
                ),
                { quote: I, transaction: null, failureReason: "no-blockhash" }
              );
            }
            let x = (0, eR.w)(S.bondingCurve?.quoteMint) ? eG.K : eG.f,
              R = F ? eG.K : x;
            try {
              let t = s ?? (0, eG.v)(o, R);
              if (null === t)
                return (
                  console.warn(
                    "[BlockchainStore] getSwapTx: amount not representable as atomic",
                    { mint: e, uiAmount: o, inputDecimals: R },
                  ),
                  {
                    quote: I,
                    transaction: null,
                    failureReason: "amount-not-atomic",
                  }
                );
              let p = new d.default(t.toString()),
                b = B.global?.decodedAccount,
                k = B.feeConfig?.decodedAccount,
                A = S.mintAccount?.decodedAccount;
              if (
                !S.pool &&
                S.raydium?.poolKeys &&
                S.raydium.baseVaultAccount &&
                S.raydium.quoteVaultAccount &&
                (!S.bondingCurve || !0 === S.bondingCurve.complete) &&
                S.raydium
              ) {
                let e = S.mintAccount?.accountInfo.owner ?? m.z,
                  t = (0, c.h)(m.w, E, !0, m.z),
                  n =
                    P.userWsolAccountInfo?.decodedAccount?.amount ?? BigInt(-1);
                if (n < BigInt(0))
                  try {
                    let e = await C.getAccountInfo(t);
                    n = e
                      ? u.d.decode(new Uint8Array(e.data)).amount
                      : BigInt(0);
                  } catch (e) {
                    (console.warn(
                      "[BlockchainStore] Raydium swap: failed to fetch user WSOL ATA, treating as zero",
                      e,
                    ),
                      (n = BigInt(0)));
                  }
                let { buildRaydiumV4SwapInstructions: a } = await eX(),
                  o = a({
                    raydium: S.raydium,
                    userKey: E,
                    mintKey: q,
                    tokenProgram: e,
                    isBuy: T,
                    isTokenInput: F,
                    tradeQuote: I,
                    preExistingWsolBalance: n,
                  });
                if (!o)
                  return {
                    quote: I,
                    transaction: null,
                    failureReason: "raydium-build-failed",
                  };
                let r = (0, ec.u)(o, e_.L, y, f, E, w, g),
                  i = new l.TransactionMessage({
                    payerKey: E,
                    recentBlockhash: v.blockhash,
                    instructions: r,
                  }).compileToV0Message(),
                  s = (0, eF.x)({
                    transaction: new l.VersionedTransaction(i),
                    feeMode: g,
                  });
                return { quote: I, transaction: s };
              }
              if (
                S.bondingCurve &&
                S.bondingCurveAccountInfo &&
                !S.bondingCurve.complete
              ) {
                let e;
                if (!b)
                  return (
                    console.warn(
                      "[BlockchainStore] getSwapTx: No global data available",
                    ),
                    {
                      quote: I,
                      transaction: null,
                      failureReason: "missing-global-state",
                    }
                  );
                let t = S.mintAccount?.accountInfo.owner ?? m.z,
                  n = S.bondingCurve,
                  a = A ? (0, eu.B)(A) : null;
                if (T) {
                  let o, i;
                  ((o = F
                    ? p
                    : (0, r.Y)({
                        global: b,
                        feeConfig: k ?? null,
                        mintSupply: a,
                        bondingCurve: n,
                        amount: p,
                        quoteMint: (0, eR.k)(n?.quoteMint),
                      })),
                    (i = (0, r.S)({
                      global: b,
                      feeConfig: k ?? null,
                      mintSupply: a,
                      bondingCurve: n,
                      amount: o,
                      quoteMint: (0, eR.k)(n?.quoteMint),
                    })),
                    (e = await r.A.buyV2Instructions({
                      global: b,
                      bondingCurveAccountInfo: S.bondingCurveAccountInfo,
                      bondingCurve: n,
                      associatedUserAccountInfo:
                        S.associatedUserAccountInfo?.accountInfo ?? null,
                      mint: q,
                      user: E,
                      amount: o,
                      quoteAmount: i,
                      slippage: _,
                      tokenProgram: t,
                      quoteTokenProgram: m.z,
                    })));
                } else {
                  let o = (0, r.b)({
                    global: b,
                    feeConfig: k ?? null,
                    mintSupply: a ?? new d.default(0),
                    bondingCurve: n,
                    amount: p,
                  });
                  e = await r.A.sellV2Instructions({
                    global: b,
                    bondingCurveAccountInfo: S.bondingCurveAccountInfo,
                    bondingCurve: n,
                    mint: q,
                    user: E,
                    amount: p,
                    quoteAmount: o,
                    slippage: _,
                    tokenProgram: t,
                    quoteTokenProgram: m.z,
                  });
                }
                let o = (0, ec.u)(e, e_.i, y, f, E, w, g),
                  i = new l.TransactionMessage({
                    payerKey: E,
                    recentBlockhash: v.blockhash,
                    instructions: o,
                  }).compileToV0Message(),
                  s = (0, eF.x)({
                    transaction: new l.VersionedTransaction(i),
                    feeMode: g,
                  });
                return { quote: I, transaction: s };
              }
              if (S.bondingCurve && S.bondingCurve.complete && !S.pool) {
                if (!b?.withdrawAuthority)
                  return (
                    console.warn(
                      "[BlockchainStore] getSwapTx: No withdrawAuthority for migration",
                    ),
                    {
                      quote: I,
                      transaction: null,
                      failureReason: "missing-global-state",
                    }
                  );
                let e = S.mintAccount?.accountInfo.owner ?? m.z,
                  t = await r.A.migrateV2Instruction({
                    withdrawAuthority: b.withdrawAuthority,
                    quoteMint: (0, eR.k)(S.bondingCurve?.quoteMint),
                    baseTokenProgram: e,
                    quoteTokenProgram: m.z,
                    mint: q,
                    user: E,
                  }),
                  n = [
                    l.ComputeBudgetProgram.setComputeUnitLimit({ units: e_.U }),
                    l.ComputeBudgetProgram.setComputeUnitPrice({
                      microLamports: 1e4,
                    }),
                    t,
                  ],
                  a = new l.TransactionMessage({
                    payerKey: E,
                    recentBlockhash: v.blockhash,
                    instructions: n,
                  }).compileToV0Message(),
                  o = (0, eF.x)({ transaction: new l.VersionedTransaction(a) });
                return { quote: I, transaction: o, isMigration: !0 };
              }
              if (
                S.pool &&
                S.poolAccountInfo &&
                S.poolBaseTokenAccount &&
                S.poolQuoteTokenAccount &&
                S.mintAccount
              ) {
                let e,
                  t = B.globalConfig?.decodedAccount,
                  a = B.ammFeeConfig?.decodedAccount;
                if (!t)
                  return (
                    console.warn(
                      "[BlockchainStore] getSwapTx: No AMM global config available",
                    ),
                    {
                      quote: I,
                      transaction: null,
                      failureReason: "missing-global-state",
                    }
                  );
                let o = S.mintAccount.accountInfo.owner,
                  r = S.pool,
                  s = (0, eR.k)(
                    S.bondingCurve?.quoteMint ??
                      (n.quote_mint ? new l.PublicKey(n.quote_mint) : void 0),
                  ),
                  u = m.z,
                  d = eY({
                    mintKey: q,
                    quoteMintKey: s,
                    poolAddress: n.pool_address,
                  }),
                  b = (0, eu.b)(S.poolBaseTokenAccount.decodedAccount),
                  h = (0, eu.b)(S.poolQuoteTokenAccount.decodedAccount),
                  k = (0, c.h)(q, E, !0, o),
                  A = (0, c.h)(s, E, !0, u),
                  P = await C.getAccountInfo(A),
                  M = S.associatedUserAccountInfo?.accountInfo ?? null,
                  x = {
                    poolKey: d,
                    poolAccountInfo: S.poolAccountInfo,
                    pool: r,
                    poolBaseAmount: b,
                    poolQuoteAmount: h,
                    baseMint: q,
                    baseMintAccount: S.mintAccount.decodedAccount,
                    feeConfig: a ?? null,
                    globalConfig: t,
                    user: E,
                    userBaseAccountInfo: M,
                    userQuoteAccountInfo: P,
                    userBaseTokenAccount: k,
                    userQuoteTokenAccount: A,
                    baseTokenProgram: o,
                    quoteTokenProgram: u,
                  };
                if (T) {
                  let n, o;
                  (F
                    ? (n = p)
                    : ({ base: n } = (0, i.m)({
                        quote: p,
                        slippage: _,
                        baseReserve: b,
                        quoteReserve: h,
                        globalConfig: t,
                        baseMintAccount: S.mintAccount.decodedAccount,
                        baseMint: q,
                        coinCreator: r.coinCreator,
                        creator: r.creator,
                        feeConfig: a ?? null,
                        virtualQuoteReserves: r.virtualQuoteReserves,
                      })),
                    ({ maxQuote: o } = (0, i.u)({
                      base: n,
                      slippage: _,
                      baseReserve: b,
                      quoteReserve: h,
                      globalConfig: t,
                      coinCreator: r.coinCreator,
                      creator: r.creator,
                      feeConfig: a ?? null,
                      baseMintAccount: S.mintAccount.decodedAccount,
                      baseMint: q,
                      virtualQuoteReserves: r.virtualQuoteReserves,
                    })),
                    (e = await i.q.buyInstructions(x, n, o)));
                } else {
                  let { minQuote: n } = (0, i.N)({
                    base: p,
                    slippage: _,
                    baseReserve: b,
                    quoteReserve: h,
                    globalConfig: t,
                    baseMintAccount: S.mintAccount.decodedAccount,
                    baseMint: q,
                    coinCreator: r.coinCreator,
                    creator: r.creator,
                    feeConfig: a ?? null,
                    virtualQuoteReserves: r.virtualQuoteReserves,
                  });
                  (console.log(
                    `[BlockchainStore] sellInstructions base=${p.toString()} minQuote=${n.toString()}`,
                  ),
                    (e = await i.q.sellInstructions(x, p, n)));
                }
                let R = (0, ec.u)(e, e_.t, y, f, E, w, g),
                  U = new l.TransactionMessage({
                    payerKey: E,
                    recentBlockhash: v.blockhash,
                    instructions: R,
                  }).compileToV0Message(),
                  V = (0, eF.x)({
                    transaction: new l.VersionedTransaction(U),
                    feeMode: g,
                  });
                return { quote: I, transaction: V };
              }
              let M = !S.bondingCurve && !S.pool && !1 === n.initialized;
              if (M && T && h && a) {
                if (!b)
                  return (
                    console.warn(
                      "[BlockchainStore] getSwapTx: No global data available for free coin creation",
                    ),
                    {
                      quote: I,
                      transaction: null,
                      failureReason: "missing-global-state",
                    }
                  );
                console.log(
                  `[BlockchainStore] getSwapTx: Creating and buying free coin mint=${e}`,
                );
                let t = (0, r.Y)({
                    global: b,
                    feeConfig: k ?? null,
                    mintSupply: null,
                    bondingCurve: null,
                    amount: p,
                    quoteMint: (0, eR.k)(),
                  }),
                  n = (0, r.S)({
                    global: b,
                    feeConfig: k ?? null,
                    mintSupply: null,
                    bondingCurve: null,
                    amount: t,
                    quoteMint: (0, eR.k)(),
                  }),
                  o = new l.PublicKey(a),
                  i = await r.A.createV2AndBuyInstructions({
                    global: b,
                    mint: q,
                    name: h.name,
                    symbol: h.symbol,
                    uri: h.uri,
                    mayhemMode: !1,
                    cashback: !1,
                    creator: o,
                    user: E,
                    amount: t,
                    solAmount: n,
                  }),
                  s = (0, ec.u)(i, e_.v + e_.i, y, f, E, w, g),
                  u = await C.getAddressLookupTable(
                    new l.PublicKey(
                      "Hyif6eWb8x88RVrvjPfabsgRYnwkVnyByEXTVTXbUcyP",
                    ),
                  ),
                  c = u.value ? [u.value] : [],
                  m = new l.TransactionMessage({
                    payerKey: E,
                    recentBlockhash: v.blockhash,
                    instructions: s,
                  }).compileToV0Message(c),
                  d = (0, eF.x)({
                    transaction: new l.VersionedTransaction(m),
                    feeMode: g,
                  });
                return { quote: I, transaction: d, isFreeCoinCreation: !0 };
              }
              if (M)
                return (
                  T
                    ? h ||
                      console.warn(
                        "[BlockchainStore] getSwapTx: Free coin creation requires newCoinMetadata (name, symbol, uri)",
                      )
                    : console.warn(
                        "[BlockchainStore] getSwapTx: Cannot sell free coin - bonding curve not yet created",
                      ),
                  {
                    quote: I,
                    transaction: null,
                    failureReason: "free-coin-missing-data",
                  }
                );
              return (
                console.warn(
                  "[BlockchainStore] getSwapTx: No bonding curve or pool available for mint:",
                  e,
                  S,
                ),
                {
                  quote: I,
                  transaction: null,
                  failureReason: "state-not-hydrated",
                }
              );
            } catch (e) {
              return (
                console.error(
                  "[BlockchainStore] getSwapTx: Error building transaction:",
                  e,
                ),
                {
                  quote: I,
                  transaction: null,
                  failureReason: (0, eG.R)(e) ? "network-error" : "build-error",
                }
              );
            }
          },
          signAndSendTransaction: async ({
            transaction: e,
            wallet: n,
            frontRunningProtection: a,
            coSignTransaction: o,
            onSigningStarted: r,
          }) => {
            let { connection: i } = t();
            if (!i) return null;
            let s = await (0, eF.c)({ connection: i, transaction: e });
            if (o) {
              let e = await o(s);
              ((0, eF.s)({ from: s, to: e }), (s = e));
            }
            r?.();
            let u = await n.signTransaction(s);
            return (
              (0, eF.s)({ from: s, to: u }),
              t().sendSignedTransaction({
                signedTx: u,
                frontRunningProtection: a,
              })
            );
          },
          sendSignedTransaction: async ({
            signedTx: e,
            frontRunningProtection: n,
          }) => {
            let { connection: a } = t();
            if (!a)
              return (
                console.error(
                  "[BlockchainStore] sendSignedTransaction: No connection available",
                ),
                null
              );
            try {
              return (function ({
                connection: e,
                signedTx: t,
                frontRunningProtection: n,
                feeMode: a,
              }) {
                let o = performance.now(),
                  r = (0, eu.w)(t),
                  i = (0, eF.Q)(t),
                  s = a ?? (0, eF.P)(t),
                  u = ((e) => {
                    let { staticAccountKeys: t, header: n } = e.message,
                      a = t.slice(0, n.numRequiredSignatures);
                    return e.signatures.flatMap((e, t) =>
                      e.every((e) => 0 === e)
                        ? [a[t]?.toBase58() ?? `signer #${t}`]
                        : [],
                    );
                  })(t);
                if (u.length > 0) {
                  let e = new eM(u);
                  throw (
                    (0, ea.l)({
                      error: e,
                      feature: "trade",
                      operation: "broadcast-precheck",
                      context: {
                        signature: r,
                        missingSigners: u.join(","),
                        feeMode: s,
                      },
                    }),
                    e
                  );
                }
                let c = (0, eI.f)(t),
                  m = {
                    label: "rpc",
                    send: () =>
                      e.sendRawTransaction(c, {
                        skipPreflight: !0,
                        maxRetries: 0,
                      }),
                  },
                  l =
                    eq.A && "dust" !== s
                      ? n
                        ? [{ label: "jito", send: (0, ec.e)(c) }]
                        : [
                            { label: "jito", send: (0, ec.e)(c) },
                            ...(0, ec.f)(c).map((e, t) => ({
                              label: `temporal-${t + 1}`,
                              send: e,
                            })),
                            m,
                          ]
                      : [m],
                  d = eT({
                    connection: e,
                    signature: r,
                    blockhash: t.message.recentBlockhash,
                    lastValidBlockHeight: i?.lastValidBlockHeight,
                    commitment: "processed",
                    signedTx: t,
                  }).then(() => ({ err: null })),
                  p = new Set();
                return (
                  (({
                    broadcasts: e,
                    confirmation: t,
                    intervalMs: n = 500,
                    timeoutMs: a = 3e4,
                    maxBroadcasts: o = 60,
                    onFailure: r,
                    maxBackoffMs: i = 5e3,
                  }) => {
                    let s,
                      u,
                      c = new AbortController(),
                      m = Date.now(),
                      l = performance.now(),
                      d = Math.max(
                        1,
                        Math.ceil(Math.max(i, 0) / Math.max(n, 1)),
                      ),
                      p = e.map((e) => ({
                        broadcast: e,
                        attempts: 0,
                        failures: 0,
                        inFlight: !1,
                        consecutiveBackoffs: 0,
                        skipTicks: 0,
                        firstFailure: void 0,
                      })),
                      _ = !1,
                      y = () => {
                        _ ||
                          ((_ = !0),
                          clearTimeout(s),
                          clearTimeout(u),
                          c.abort());
                      },
                      f = () => {
                        _ ||
                          (Math.max(Date.now() - m, performance.now() - l) >= a
                            ? y()
                            : (p.forEach((e, t) => {
                                if (_ || e.inFlight || e.attempts >= o) return;
                                if (e.skipTicks > 0) {
                                  e.skipTicks -= 1;
                                  return;
                                }
                                ((e.inFlight = !0), (e.attempts += 1));
                                let n = e.attempts,
                                  a = (a) => {
                                    ((e.inFlight = !1),
                                      ((e, t, n, a) => {
                                        if (c.signal.aborted) return;
                                        let o = ((e) => {
                                          if (
                                            "object" != typeof e ||
                                            null === e
                                          )
                                            return;
                                          let t = e.status;
                                          return "number" == typeof t
                                            ? t
                                            : void 0;
                                        })(a);
                                        ((e.failures += 1),
                                          (e.firstFailure ??= {
                                            attempt: n,
                                            status: o,
                                            message:
                                              a instanceof Error
                                                ? a.message
                                                : String(a),
                                          }),
                                          429 === o ||
                                          (void 0 !== o && o >= 500)
                                            ? ((e.consecutiveBackoffs += 1),
                                              (e.skipTicks =
                                                Math.min(
                                                  2 ** e.consecutiveBackoffs,
                                                  d,
                                                ) - 1))
                                            : ((e.consecutiveBackoffs = 0),
                                              (e.skipTicks = 0)));
                                        try {
                                          r?.({
                                            transport: t,
                                            attempt: n,
                                            error: a,
                                            status: o,
                                          });
                                        } catch {}
                                      })(e, t, n, a));
                                  };
                                try {
                                  Promise.resolve(e.broadcast(c.signal)).then(
                                    () => {
                                      ((e.inFlight = !1),
                                        (e.consecutiveBackoffs = 0),
                                        (e.skipTicks = 0));
                                    },
                                    a,
                                  );
                                } catch (e) {
                                  a(e);
                                }
                              }),
                              !_ &&
                                p.some((e) => e.attempts < o) &&
                                (s = setTimeout(f, n))));
                      };
                    return (t.then(y, y),
                    0 === p.length ||
                      !Number.isFinite(n) ||
                      n <= 0 ||
                      !Number.isFinite(a) ||
                      a <= 0 ||
                      !Number.isInteger(o) ||
                      o <= 0)
                      ? y()
                      : ((u = setTimeout(y, a)), f());
                  })({
                    broadcasts: l.map((e) => e.send),
                    confirmation: d,
                    onFailure: ({
                      transport: e,
                      attempt: t,
                      error: n,
                      status: a,
                    }) => {
                      p.has(e) ||
                        (p.add(e),
                        (0, ea.l)({
                          error: n,
                          feature: "trade",
                          operation: "rebroadcast",
                          context: {
                            transport: l[e]?.label,
                            attempt: t,
                            status: a,
                            signature: r,
                            feeMode: s,
                          },
                        }));
                    },
                  }),
                  {
                    signature: r,
                    confirmTxPromise: d,
                    signedTimestamp: o,
                    feeMode: s,
                  }
                );
              })({ connection: a, signedTx: e, frontRunningProtection: n });
            } catch (e) {
              return (
                console.error(
                  "[BlockchainStore] sendSignedTransaction: Error:",
                  e,
                ),
                null
              );
            }
          },
          getDebugSnapshot: () => {
            let e = t(),
              n = Date.now(),
              a = Object.entries(e.subscriptions).map(([t, n]) => ({
                subKey: t,
                active: n.active,
                holdersCount: e.holdersBySubKey[t]?.size ?? 0,
                pendingUnsubAt: n.pendingUnsubAt,
                lastMessageAt: n.lastMessageAt,
              })),
              o = Object.values(e.leaseMeta).map((e) => n - e.lastSeenAt),
              r = o.length > 0 ? Math.max(...o) : null;
            return {
              generation: e.generation,
              subscriptions: a,
              leaseCount: Object.keys(e.leaseMeta).length,
              oldestLeaseAge: r,
            };
          },
          reset: () => {
            t().stopGcTimers();
            let n = t();
            for (let e of Object.values(n.subscriptions))
              (e.abortController && e.abortController.abort(),
                e.active &&
                  null !== e.rpcSubId &&
                  n.connection &&
                  n.connection.removeAccountChangeListener(e.rpcSubId));
            (n.blockhashCleanup && n.blockhashCleanup(),
              e(() => ({ ...eQ, connection: n.connection })));
          },
        })),
        (e, n, a) => (
          (a.setState = (t, n, ...a) =>
            e("function" == typeof t ? Y(t) : t, n, ...a)),
          t(a.setState, n)
        )),
      ),
    ),
    e8 = !1;
  !(function () {
    if (e8 || o.default.env.VITEST) return;
    ((e8 = !0), e5.subscribe(eH.e));
    let e = e5.getState();
    (e.initializeConnectionAndSetup(
      "https://solana-mainnet.pump.fun/f15623a5-2536-4b47-9641-8abc239413ba",
      ey(),
    ),
      e.setUserAddress((0, eV.b)()),
      (0, eV.U)((e) => {
        e5.getState().setUserAddress(e);
      }),
      (0, ex.p)(({ mint: e, chainId: t }) => {
        t || e5.getState().reconcileAccountsAfterTrade(e);
      }));
  })();
};
