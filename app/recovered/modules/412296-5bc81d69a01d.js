// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  class t extends Error {
    constructor(e) {
      (super(e), (this.name = "TimeoutError"));
    }
  }
  function r(e) {
    return e instanceof Error && "TimeoutError" === e.name;
  }
  function a({ promise: e, ms: r, label: f }) {
    let n,
      i = Promise.resolve(e);
    return (
      i.catch(() => {}),
      Promise.race([
        i,
        new Promise((e, a) => {
          n = setTimeout(
            () => a(new t(`${f} did not respond within ${r}ms`)),
            r,
          );
        }),
      ]).finally(() => clearTimeout(n))
    );
  }
  e.s(["d", 0, r, "k", 0, a], 762193);
  let f = (0, e.i(78436).$)((e, t) => ({
      blockhash: null,
      intervalId: null,
      startInterval: (r) => {
        let a = t().intervalId;
        (a && clearInterval(a), e({ intervalId: r }));
      },
      stopInterval: () => {
        let r = t().intervalId;
        (r && clearInterval(r), e({ intervalId: null }));
      },
      setBlockhash: (r) => {
        let a = t().blockhash?.lastValidBlockHeight ?? 0;
        r.lastValidBlockHeight > a && e({ blockhash: r });
      },
    })),
    n = f.getInitialState().setBlockhash,
    i = f.getInitialState().startInterval,
    s = f.getInitialState().stopInterval,
    c = () => f.getState().blockhash;
  e.s(["z", 0, c, "V", 0, n, "J", 0, i, "X", 0, s], 446870);
  var o = e.i(564035);
  let l = new WeakMap(),
    u = new WeakMap();
  function d(e) {
    let t = Date.now() - e.wallTime,
      r = performance.now() - e.monotonicTime;
    return t < 0 || r < 0 ? 1 / 0 : Math.max(t, r);
  }
  function h(e) {
    let t = u.get(e);
    if (t) return t;
    let r = Date.now(),
      f = performance.now(),
      i = a({
        promise: e.getLatestBlockhash(),
        ms: 5e3,
        label: "refreshing the transaction blockhash",
      })
        .then((t) => {
          let a = { value: t, wallTime: r, monotonicTime: f };
          if (!(1e4 >= d(a))) throw Error("Blockhash refresh is stale");
          let i = l.get(e);
          if (
            i &&
            t.lastValidBlockHeight < i.value.lastValidBlockHeight &&
            3e4 >= d(i)
          )
            throw Error("Blockhash refresh returned an older block");
          return (l.set(e, a), n(t), t);
        })
        .finally(() => {
          u.get(e) === i && u.delete(e);
        });
    return (u.set(e, i), i);
  }
  function p(e) {
    let t = l.get(e);
    return t && 1e4 >= d(t)
      ? Promise.resolve(t.value)
      : h(e).catch((t) => {
          let a = l.get(e);
          if (a && 3e4 >= d(a)) return a.value;
          throw new o.U(r(t) ? "timeout" : "rpc-error", { cause: t });
        });
  }
  async function m(e) {
    let t = c();
    return t || (e ? p(e) : null);
  }
  e.s(["w", 0, m, "R", 0, p, "f", 0, h], 443618);
  var g = e.i(110823);
  let y = new WeakSet(),
    B = new WeakMap(),
    b = new WeakMap();
  async function w({ connection: e, transaction: t }) {
    if (
      !y.has(t) ||
      0 !== t.version ||
      t.signatures.some((e) => e.some((e) => 0 !== e))
    )
      return t;
    let r = await p(e);
    return ((t.message.recentBlockhash = r.blockhash), B.set(t, r), t);
  }
  function v(e) {
    let t = B.get(e);
    return t && t.blockhash === e.message.recentBlockhash ? t : void 0;
  }
  e.s(
    [
      "s",
      0,
      function ({ from: e, to: t }) {
        let r = v(e);
        r && r.blockhash === t.message.recentBlockhash && B.set(t, r);
        let a = b.get(e);
        a && b.set(t, a);
      },
      "Q",
      0,
      v,
      "P",
      0,
      function (e) {
        return b.get(e) ?? g.f;
      },
      "c",
      0,
      w,
      "x",
      0,
      function ({ transaction: e, blockhash: t, feeMode: r }) {
        return (
          y.add(e),
          t && t.blockhash === e.message?.recentBlockhash && B.set(e, t),
          r && b.set(e, r),
          e
        );
      },
    ],
    412296,
  );
};
