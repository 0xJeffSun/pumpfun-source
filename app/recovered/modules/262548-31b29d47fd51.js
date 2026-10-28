// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Map(),
    r = new Map(),
    n = 0;
  e.s(
    [
      "f",
      0,
      function (e, i, a) {
        let s = ++n,
          o = () => t.get(e) || [],
          u = () => {
            let n = o();
            if (!n.some((e) => e.id === s)) return;
            let i = r.get(e);
            if (1 === n.length && i) {
              let e = i();
              e instanceof Promise && e.catch(() => {});
            }
            (() => {
              let n = o().filter((e) => e.id !== s);
              if (0 === n.length) {
                (t.delete(e), r.delete(e));
                return;
              }
              t.set(e, n);
            })();
          },
          l = o();
        if ((t.set(e, [...l, { id: s, fns: i }]), l && l.length > 0)) return u;
        let c = {};
        for (let e in i)
          c[e] = (...t) => {
            let r = o();
            if (0 !== r.length) for (let n of r) n.fns[e]?.(...t);
          };
        let f = a(c);
        return ("function" == typeof f && r.set(e, f), u);
      },
    ],
    262548,
  );
  var i = e.i(690651);
  async function a(e, { signal: t } = {}) {
    return new Promise((r, n) => {
      if (t?.aborted) return void n((0, i.l)(t));
      let a = () => t?.removeEventListener("abort", o),
        s = setTimeout(() => {
          (a(), r());
        }, e),
        o = () => {
          (clearTimeout(s), a(), n((0, i.l)(t)));
        };
      t?.addEventListener("abort", o, { once: !0 });
    });
  }
  (e.s(["f", 0, a], 903078),
    e.s(
      [
        "f",
        0,
        function (
          e,
          {
            delay: t = 100,
            retryCount: r = 2,
            shouldRetry: n = () => !0,
            signal: s,
          } = {},
        ) {
          return new Promise((o, u) => {
            let l = async ({ count: c = 0 } = {}) => {
              if (s?.aborted) return void u((0, i.l)(s));
              let f = async ({ error: e }) => {
                let r = "function" == typeof t ? t({ count: c, error: e }) : t;
                if (r)
                  try {
                    await a(r, { signal: s });
                  } catch (e) {
                    u(e);
                    return;
                  }
                return l({ count: c + 1 });
              };
              try {
                let t = await e();
                o(t);
              } catch (e) {
                if (s?.aborted) return void u((0, i.l)(s));
                if ((0, i.c)(e)) return void u(e);
                if (c < r && (await n({ count: c, error: e })))
                  return f({ error: e });
                u(e);
              }
            };
            l().catch(u);
          });
        },
      ],
      591774,
    ));
};
