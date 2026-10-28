// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  class t extends Error {
    constructor(e) {
      (super(e), (this.name = "TimeoutError"));
    }
  }
  function n(e) {
    return e instanceof Error && "TimeoutError" === e.name;
  }
  function r({ promise: e, ms: n, label: o }) {
    let i,
      u = Promise.resolve(e);
    return (
      u.catch(() => {}),
      Promise.race([
        u,
        new Promise((e, r) => {
          i = setTimeout(
            () => r(new t(`${o} did not respond within ${n}ms`)),
            n,
          );
        }),
      ]).finally(() => clearTimeout(i))
    );
  }
  e.s(["d", 0, n, "k", 0, r], 762193);
  let o = (0, e.i(78436).$)((e, t) => ({
      blockhash: null,
      intervalId: null,
      startInterval: (n) => {
        let r = t().intervalId;
        (r && clearInterval(r), e({ intervalId: n }));
      },
      stopInterval: () => {
        let n = t().intervalId;
        (n && clearInterval(n), e({ intervalId: null }));
      },
      setBlockhash: (n) => {
        let r = t().blockhash?.lastValidBlockHeight ?? 0;
        n.lastValidBlockHeight > r && e({ blockhash: n });
      },
    })),
    i = o.getInitialState().setBlockhash,
    u = o.getInitialState().startInterval,
    a = o.getInitialState().stopInterval,
    l = () => o.getState().blockhash;
  e.s(["z", 0, l, "V", 0, i, "J", 0, u, "X", 0, a], 446870);
  var c = e.i(564035);
  let s = new WeakMap(),
    f = new WeakMap();
  function d(e) {
    let t = Date.now() - e.wallTime,
      n = performance.now() - e.monotonicTime;
    return t < 0 || n < 0 ? 1 / 0 : Math.max(t, n);
  }
  function m(e) {
    let t = f.get(e);
    if (t) return t;
    let n = Date.now(),
      o = performance.now(),
      u = r({
        promise: e.getLatestBlockhash(),
        ms: 5e3,
        label: "refreshing the transaction blockhash",
      })
        .then((t) => {
          let r = { value: t, wallTime: n, monotonicTime: o };
          if (!(1e4 >= d(r))) throw Error("Blockhash refresh is stale");
          let u = s.get(e);
          if (
            u &&
            t.lastValidBlockHeight < u.value.lastValidBlockHeight &&
            3e4 >= d(u)
          )
            throw Error("Blockhash refresh returned an older block");
          return (s.set(e, r), i(t), t);
        })
        .finally(() => {
          f.get(e) === u && f.delete(e);
        });
    return (f.set(e, u), u);
  }
  function h(e) {
    let t = s.get(e);
    return t && 1e4 >= d(t)
      ? Promise.resolve(t.value)
      : m(e).catch((t) => {
          let r = s.get(e);
          if (r && 3e4 >= d(r)) return r.value;
          throw new c.U(n(t) ? "timeout" : "rpc-error", { cause: t });
        });
  }
  async function g(e) {
    let t = l();
    return t || (e ? h(e) : null);
  }
  e.s(["w", 0, g, "R", 0, h, "f", 0, m], 443618);
  var p = e.i(110823);
  let b = new WeakSet(),
    A = new WeakMap(),
    y = new WeakMap();
  async function v({ connection: e, transaction: t }) {
    if (
      !b.has(t) ||
      0 !== t.version ||
      t.signatures.some((e) => e.some((e) => 0 !== e))
    )
      return t;
    let n = await h(e);
    return ((t.message.recentBlockhash = n.blockhash), A.set(t, n), t);
  }
  function w(e) {
    let t = A.get(e);
    return t && t.blockhash === e.message.recentBlockhash ? t : void 0;
  }
  e.s(
    [
      "s",
      0,
      function ({ from: e, to: t }) {
        let n = w(e);
        n && n.blockhash === t.message.recentBlockhash && A.set(t, n);
        let r = y.get(e);
        r && y.set(t, r);
      },
      "Q",
      0,
      w,
      "P",
      0,
      function (e) {
        return y.get(e) ?? p.f;
      },
      "c",
      0,
      v,
      "x",
      0,
      function ({ transaction: e, blockhash: t, feeMode: n }) {
        return (
          b.add(e),
          t && t.blockhash === e.message?.recentBlockhash && A.set(e, t),
          n && y.set(e, n),
          e
        );
      },
    ],
    412296,
  );
};
